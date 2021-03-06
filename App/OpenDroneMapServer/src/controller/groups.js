const {Group} = require('../models/groups');
const {User} = require('../models/user');
const io = require('../../server').io
const bcrypt = require('bcrypt');
const randomString = require('randomstring')
const nodeMailer = require('nodemailer')
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path');
const crypto = require('crypto');
// Create mongo connection
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURI = process.env.MONGODB_URL;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
let filename;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
exports.upload = multer({storage});

exports.getImageInfo = async (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            const readstream2 = gfs.createReadStream(file.filename)
            readstream2.pipe(res);
            // res.status(404).json({
            //     err: 'Not an image'
            // });
        }
    });
}

exports.uploadAvatar = async (req, res) => {
    try {
        let avatarLink = "https://fierce-oasis-19381.herokuapp.com/image/" + filename
        // req.user.avatar=avatarLink
        // await req.user.save();
        res.send(avatarLink)
        // res.redirect('/')
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getTripList = async (req, res) => {
    try {
        let tripListAll = await Group.find({})
        let response=[]
        await tripListAll.map(async (trip)=>{
           if(trip.captain===req.user.username) {
               response.push(trip)
           }
           else{
               await trip.members.map((member)=>{
                   if(member===req.user.username){
                       response.push(trip)
                   }
               })
           }
        })
        res.send(response)
    } catch (e) {

    }
}

exports.createTrip = async (req, res) => {
    try {
        let defaultAvatarUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';
        let member = [];
        member.push(req.user.username)
        let trip = new Group({
            groupId: req.body.groupId,
            groupName: req.body.groupName,
            groupDescription: req.body.groupDescription,
            groupAvatar: defaultAvatarUrl,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            captain: req.user.username,
            members: member
        })
        await trip.save()

        // io.on('connection', (socket) => {
        //     console.log('New WebSocket connection')
        //     socket.on('room', data => {
        //         console.log('room join');
        //         console.log(data);
        //         socket.join(data.room);
        //         socket.emit('room', {room: 'Hello'});
        //     });
        // })
        // let user = await User.findOne({username:req.user.username})
        // let notification={
        //     groupId:req.body.groupId,
        //     groupName:req.body.groupName,
        //     content:'đã tạo nhóm',
        //     time:new Date()
        // }
        // user.notification.unshift(notification)
        // await user.save()
        res.send(trip)
    } catch (e) {
        console.log(e)
    }
}

exports.editTrip = async (req, res) => {
    try {
        let editedTrip = await Group.updateOne({_id: req.params.id}, req.body)
        let trip = await Group.findOne({_id: req.params.id})
        if (trip.members) {
            await trip.members.map(async (item) => {
                if (item !== req.user.username) {
                    console.log(item)
                    let user = await User.findOne({username: item})
                    let notification = {
                        groupId: req.body.groupId,
                        groupName: req.body.groupName,
                        owner: req.user.username,
                        content: 'đã chỉnh sửa chuyến đi',
                        time: new Date()
                    }
                    user.notification.unshift(notification)
                    await user.save()
                }
            })
        }
        res.status(200).send(editedTrip)

    } catch (e) {
        console.log(e)
    }
}

exports.joinTrip = async (req, res) => {
    try {
        let chooseGroup = await Group.findOne({groupId: req.params.groupId})
        let flag = true;
        console.log(chooseGroup.members)
        await chooseGroup.members.map((item) => {
            if (item === req.user.username) {
                flag = false
            }
        })
        if (flag) {
            await chooseGroup.members.push(req.user.username)
        }
        await chooseGroup.save()
        res.status(200).send(chooseGroup)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
}

exports.addDestination = async (req, res, socket) => {
    try {
        console.log(req.params.groupId)
        let chosenGroup = await Group.findOne({groupId: req.params.groupId})
        let destination = req.body
        delete destination.groupId
        let flag = true
        await chosenGroup.schedule.map((item) => {
            if (item.destinationId === destination.destinationId) {
                flag = false
            }
        })
        if (flag) {
            await chosenGroup.schedule.push(destination)
        }
        await chosenGroup.save()

        if (chosenGroup.members) {
            await chosenGroup.members.map(async (item) => {
                if (item !== req.user.username) {
                    console.log(item)
                    let user = await User.findOne({username: item})
                    let notification = {
                        groupId: req.body.groupId,
                        groupName: req.body.groupName,
                        owner: req.user.username,
                        content: 'đã chỉnh thêm điểm đến của chuyến đi',
                        time: new Date()
                    }
                    user.notification.unshift(notification)
                    await user.save()
                }
            })

        }
        res.send(chosenGroup)
    } catch (e) {
        console.log(e)
    }
}
exports.editDestination = async (req, res) => {
    try {
        console.log(req.params.groupId)
        let chosenGroup = await Group.findOne({groupId: req.params.groupId})
        let destination = req.body
        delete destination.groupId

        await chosenGroup.schedule.map((item, index) => {
            if (item.destinationId === destination.destinationId) {
                console.log(index)
                chosenGroup.schedule[index] = destination
            }
        })
        console.log(chosenGroup.schedule)
        await chosenGroup.save()
        if (chosenGroup.members) {
            await chosenGroup.members.map(async (item) => {
                if (item !== req.user.username) {
                    console.log(item)
                    let user = await User.findOne({username: item})
                    let notification = {
                        groupId: req.body.groupId,
                        groupName: req.body.groupName,
                        owner: req.user.username,
                        content: 'đã chỉnh sửa điểm đến của chuyến đi',
                        time: new Date()
                    }
                    user.notification.unshift(notification)
                    await user.save()
                }
            })
        }
        res.send(chosenGroup)
    } catch (e) {
        console.log(e)
    }
}

exports.createWarning = async (req, res) => {
    try {
        console.log(req.params.groupId)
        let chosenGroup = await Group.findOne({groupId: req.params.groupId})
        let destination = req.body
        delete destination.groupId

        await chosenGroup.schedule.map((item, index) => {
            if (item.destinationId === destination.destinationId) {
                console.log(index)
                chosenGroup.schedule[index] = destination
            }
        })
        console.log(chosenGroup.schedule)
        await chosenGroup.save()
        res.send(chosenGroup)
    } catch (e) {
        console.log(e)
    }
}

exports.getMemberList = async (req, res) => {
    try {
        let chosenGroup = await Group.findOne({groupId: req.params.groupId})
        let memberList=[];
        await chosenGroup.members.map(async (item, index) => {
           let memberInfo= await User.findOne({username:item})
            memberList.push(memberInfo)
        })
        console.log(memberList)
        await chosenGroup.save()
        res.send(memberList)
    } catch (e) {
        console.log(e)
    }
}










