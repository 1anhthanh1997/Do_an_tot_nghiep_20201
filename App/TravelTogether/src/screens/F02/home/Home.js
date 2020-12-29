// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import homeStyles from './HomeStyles';
import StarRating from 'react-native-star-rating';
import {IMG} from '../../../constants';
import {NAVIGATE_TO_HOME_DETAIL} from '../../../navigations/routers';

const fakeData = [
  {
    name: 'Far East Tour',
    description:
      'Chuyến tham quan văn hóa, tour tham quan thành phố, chuyến tham quan tự nhiên và động vật hoang dã',
    star: 5,
    numOfVote: 882,
    distance: '1.4 km',
    hintTime: 'Hơn 3 giờ',
    location: 'Hà Nội Việt Nam',
    phoneNumber: '+84 24 3747 5877',
    imageLink: [
      'ATtYBwIN-RCJy3iKq6ZXIZFhw5kAnMklG1Sex3IOQjG4lb8FOD-XKuBUv0B5t20nSE9HcjhxFJD0t4dFDm3mP5GBS5Xl6-QJhZFttvOqk7Db4UO2OgGg1WcHJbuFKIvJY7PN270s3lVHI5yZLs_JNKOo54rJhaM_Kn_bdUt_VRrIZZAfjGKU',
      'ATtYBwLRNs4qHqaLETYIy_2-qWfXbmjFrVbvyPCeeUBNFxNDjhTbO7pTCRXtqweSl0H_Gl-8qLg6Xk2jreIR7v5swUtKP1Ct5-yQyzTQbKn8eWwLagKOznKS1raX1P9QqiZ6Q8SGSj3U_5zBYExVAFaprspGbD-Rh-CZNgn_nMPf46io5t9k',
      'ATtYBwILtj9rDhm0HoDIhvNU1ra8G6S-tSkCULLAgHZfJhnFQDL52LILMivpXbJ6Hut7tBB-8dlyi7LVZG0kESqSsSTHKlegoFseYEfEKdETpX9MMeqjV3jSDiVuWgO31-pXjfrel_nTafaZ4mqo6GQpWW6VjwmiqZv-gzI9GhXSaG-KeZYc',
      'ATtYBwLsKmJf86aV_7TYFwL7vMqN4jA9kch5uRrulQKuE2ptOK-vDXWX1yaE5XhEJuB9SuhAsDYiU1IM3UbU0W6LYk5H5jQbhWxemTrCK9YmQKx1k3wPBg2qeAfdVPpwRHJzv2WTRVB66IKFzlnSNTOAifvUTY-FxyYe_JfdLwAXz4j-GUVj',
      'ATtYBwIcUjC59WST-GOium9FTHNNT0ePGCOI3mLu9RKRi2j-WMctnWSHc_wmsjTAtA7ueUKQh3ukeXfgAZOxPO3lUgDBWA6_vRaqHLYDfQ54yU-twXNSQdoWj8JJEz1ZrE3tROTtHAgjILb_UnvEVw5MjVr45dRCui1kr3eP30hTXswnPj5E',
      'ATtYBwLNdo6gwYDt1glQf_3VpqXj6Ez5QxnObRZAuihAUMdwbyCQSdza7a5adPdNI8YdRTfjSrKEJCgR1bWxR-eO3dDTFuakiLhwzb1FlYEMO5IoWZPnsK01pu4nHtIqxtRoE-ITMjr-lJzu0VNoCHrYUwSL-0qCTSn88RtdUWwWpw80o2MT',
      'ATtYBwJNIELmU7xommOgfw25fTRtY41roYgYlYFpKqtnGTGmC-7SHoR8AMpzS3IZunij-GdwDHBUigJ8nge8Sn1bi1rZ1uZtmyHqJAsGiq-8ho31gJJtAMu5OHdutLnZMIDHfLNs7GToHpsl78quqdt8K9eGerT4rAc4QE7oFcYU32PZoAcr',
      'ATtYBwIEqVA-uuUmgcAmn30bAjegKt4DznQdj0B-_JODpx67bpVPXwz8RJWdPhNYy3VuD3ixgqVo_EZiG7dkUjpNMkoWKlCbSLoVN9lNILy6VzIXU0VUwZvMfjj9UM1Hj8Ni7IT5L7vKYDtT_sasrszaoA22rBzuQKRr7vsA7912_iDcfHtM',
      'ATtYBwLBa-HOfmD07_Vw8fZYxaNyC9ZZAqsQp1YJMouEw0LZUndSyTGsoUljVfqW6kmOgpmdeZPXjhjNhKGLPztxpKCV6Y00K5JzhIEesO2faFhCSijjDKed0Zr2L_lm3MWnMyCh_EUq8KSb3dGeGu2QbBYhcCiFt04voc3j_SLFq35J_4i1',
      'ATtYBwKgA03N1HTKjqWQp_2TGg_8WQBSo8U9wilk-ib9L2glcl9h3spVpWMCPrShxZlbE0v-JZMRh0-2FIVtHZWhWRwJCxWZG2Z8t7zAcpVgW71WIisV31IavzXmDvcZJt48mirPv3DljYCayq-EdjFGdfuNiM_Nfi3BRZsob1-HWCCu5f7S',
    ],
  },
  {
    name: 'We Ride Vietnam',
    description:
      'CHuyến tham quan bằng xe 4WD, ATV & xe địa hình. Chuyến tham quan bằng mô tô, chuyến tham quan ngắm cảnh, tour tham quan thành phố',
    star: 5,
    numOfVote: 419,
    distance: '1.3 km',
    hintTime: 'Hơn 3 giờ',
    location: 'Hà Nội Việt Nam',
    phoneNumber: '+84 168 947 5688',
    imageLink: [
      'ATtYBwLynG7D5FuugmLBP-3PhIisV1BM_ilKI9uPVYvXZzmCu824Gpsl0YlcqPcAlEKrRJBU4Dc9neJLmLwiibZrgvF-ntzsvYdF4Sr5LdlC46i6cuv6yQCofKczJ63LZ96rgQx6IAkZAF0PFZIEcrTrHW_NF8F9CtUPR33D4RAB36Ve_wQC',
      'ATtYBwIfwk6J2Z79McxQ5idOv2yXo5xcDavZ7Wkv3CtLKJkc95r9e9tZqAdmsqn8EfHM_PNs8vF7n1GYBIAv9LSJBJfXuubdw1YXscSU-l0SJ3z_pPJMRBHA_uPz8kbGmEYJm_qdznEBj8N1YeUSZ0BIGyb1Nv8vjtrUcNlm9W5YQT4SmLJ2',
      'ATtYBwLQFbtpJSGZbVAXScFMVdhymGghNe4UXOFnXZhmChcd_FHOQCdnshYStQsf_blqyHfqyNgmIh8m7ahW2jKnB5hy0oCcaVuF8lEoh1pkucxtUxolGBW35Dx4SH_G9y9i4-6QbsWquL4KMCcqHjh4d6fbkOMjCuqbvhVxOHabX5RKasOB',
      'ATtYBwJir-pyTvdjGQdCZdWkKSW369TQGf7ffC-kfMaS0MHjVTVMIYADEYdFySCG0ppHblOjd8fIyEG2AyjunC6ewjU481-lXqnLRzkSFdd6L0OOAo1GW507qi--ZkkuVBRnj2TRDrHGlJPdOtdHVu7CO5TNWUgJS6nqZFQyKdOf9fz0DPwc',
      'ATtYBwIRpxIBC2kr1NKN_qchCAGxO-IsYWT06ehubHPWng3aH5HfAPlYbWF-QFZQCrhrCZVgxL1xdPkspZqtFmIMdx0P8gCqlu2ta_KqMq9noqfUPXU_-jADzrBIJ7LGxnevhhj8RV6ZehKVT2wCfCftRw7u5F20qoF3dAwtE6RZiE6Qwo48',
      'ATtYBwJ6G4whG-JtgfB7NoP06mCDrxLWXqGbNgOW076DqGMG7tMAAHqPYNgxILASooMp2g5-W2a_y7pHGkxo3KoLyO96bEvVHhVP5udqCjTPbi3f0ChofyZm9aujF5muVdptv6OFymsBykV2_RDo8st7JdtcaeapXmX8m6D6zEUIyp26jDXe',
      'ATtYBwKS1KXVe_4jt17hdWAknwXB3zJaMFZvabLdVKiM_33O1SpB72O6Y0vmwyhMdQIatioKeusjrOsOpEZlyBzX_e-t6snqIU8PGZncE3jiv8i9WGihDzmn0Z9sUo1IRa8VmseS4m_vPaeA0u3aJIewds_vGJlNpWMCGnnGYKjTFwFD7e7c',
      'ATtYBwKpBn7PGSja2GrwsfQoXP63lUXDPbi2xPe3EibpcnQzCojTLofWxxMKFzHngGzASXr4NFh9z2IDmUjC_O9zrgyFvvi8I2f0gIH_urLStDEmJJ88-dyy84S_cWwMixAWUwrO4MMi7g8qT_AByVU7y4LSSvtqPKkAue7kBoWTLBjYumOU',
      'ATtYBwLGyOh_XWL7tnORG49Js6wyi0P3nxmIrj6YDOFWxic_HjIk1X7iU-bGjpp3SV4pZLlfvBZG7oqMe8Ryqy3ybvWBewZDplE1XVUsHZwGkmFLSdjjZEU-BxMOdYsqWacJF7I49J-nSWkyMLvv7qZj_JBHibXa93K63knh-6iMKcBdD7lo',
    ],
  },
  {
    name: 'Blue Asia Tours',
    description: 'Chuyến tham quan bằng thuyền, Chuyến tham quan tự nhiên',
    star: 5,
    numOfVote: 93,
    distance: '1.1 km',
    hintTime: 'Hơn 4 giờ',
    location:
      'R2418-Park 12 Time City, Minh Khai, HBT, Hanoi, Vietnam, Ha Nội 100000 Việt Nam',
    phoneNumber: '+84 97 546 82 52',
    imageLink: [
      'ATtYBwLhIX6SmNHvbQr0F0iw1Av1EagEoMbJDAKqtV0YqRz5hdAQ53Fbsd2R-MvNBW7WKfJE1ZqicHCmTZCpP4JFo6A3ECGGuXC6VK6YMhIk-xJXtR4vuzqp4NwvAj308Bv6bSE1cZTQLXtHBYn4g2LdRgHTw3W4TCGLUVnELt_s8MuvAMFt',
      'ATtYBwL7QlQmd83agkwC3ZjfUrrJavgyDdV9H6V1hWJZ5RTjiOiv7409_d9LiOVIfliWB6wZjB0z5ATMSiwbHugf6n0B7EjQWHCDvlKoZ54qzjkzz9vPisE0_JFc8gIM9SxRV5dZ5zcYm-CYlYcnz5pqTSCq0OPBuKCROHp5ZEML8sRiLuTY',
      'ATtYBwLXRz7QSxfLw1XeaFGl7h3uXPdeA5qLJLxR9U5zukz-R4IV69BHW_sjD4G-vAnQdu7_ejZaUC61f11OtAWYq_VfB-MjfP0vL-y3oVO-xa5d5dRnP6Ehoed3N2azh8xUoprXUQScw6BmOha-8yPng0yAnw-Ar7fpghoQhledWnuiWjt1',
      'ATtYBwK6wbqtmIn3PIasi3uOkZ5CLCXmP9_YSorD_wFk_EHjXVaNmVnMmoPHpSxIQ6BCzlyvavY8BtYLiHR-7uIvmo2rDVkFjaOUi-gFF7rd-N9YxMoQL56dL1D93GdoJNsefEImPhYkBr7yQzd9MIf2k2DthK-D1V9wig977QFHwLMMgcJi',
      'ATtYBwIarjzyouG0HUGmOCV14Nra1oYkcJ2ktLpMvE4ChBGLkcCHwqaLDHsD7FPz0Zl1GWVCkKc5Ffx9rBYm3RuelLSgiPJhmLsCDiIxoCfWm_h8PGXCanaZQPeLqZMW1VZLEQjcVD2IkWUHENs4MtFQA6WLQ4tvDRGTgs52d_kEJ86Fpoye',
      'ATtYBwKWRfvgA43uMq14zSJz1xysww_wlKYs6V-DrDH30c3_215goIRuKxBHTBr-yEkoyMZY9i6wnw1I3YVgHPkqsB78dr0uz6uBXH9H0Il_PmMVlJa5ueEt0VUzcfpmnmV5n33j2EMe-ir3hP8lSsQfXsIVdyFcRV-mSqKu3BrhbzwKEjLV',
      'ATtYBwKFqXsNZGlgoy9u_DwKFsty2kemhgexxPWGE_xdg08l4IfrSpCasq1WnuQ3fwVCAFNO5p9bIqSval_98dbrWsFDIhSjdvpVlVQ8XBK6uGtLaGfiB8JoNHSZNWnaBKBRidvcdM40XO3mkv2k05l8nD1BnKQfwUMdo-6Nq7fKso6pNHof',
      'ATtYBwKZfay6HiOhNb966glKu1sgL-irfjwb45euUFOQhMWiSV-W9fX_-XvVvz-g9wsp6iOqiWmnqohhtYa011XU3RvTEOvTmlby5jQvu4GdGSS6UFyyG5BoP18kp6QBnIAeMUkxNBKsqdP7b50fvXnOPsBF9crNdqOmrJdjScwheJzyb0tO',
      'ATtYBwLTy8ToCHfzhaITbV-TimNyqY-2URyi-NTAo93WRowv5mzSQv04GNDME4svhHHo907mrUuE-92paD7AuZZ-t78f9EyVwazJC6nyKDFGBVSFR9DuuBTINH-ra6RuUybO_D7YZKq2lFv2qWxZcaMtKEYfDMkRLPIBrSulkFeDgU7pQ3l_',
      'ATtYBwIbnswuEK2-AYoH-Z0mUjlkl665wRAXJ7oDCZVx582dgGIpXrv0bV5Ebn-7U_hOywb7rzjiJu5p7MAUXuIsVArV9LDdofFO7s7BYoIdI73-FnngCBC0hJusuFPPOrhtfyfCpsVGBKXeLXE5RYLb9xqr430eN7rlJ45jX49cdFGmFdo_',
    ],
  },
  {
    name: 'Hanoi Airport Transfer',
    description: 'Taxi & xe đưa đón',
    star: 4.5,
    numOfVote: 179,
    distance: '1.2 km',
    hintTime: '1-2 giờ',
    location: '348 Buoi Street, Ba Dinh District, Hà Nội 10000, Việt Nam',
    phoneNumber: '+84 124 409 1999',
    imageLink: [
      'ATtYBwJWhNv3kWRywtr2BWiXyBl0x64k8nLxCfkWfPTwQU2_Zxvug-jzPlHZ27QMUoAbx0T74WvI1hxHQWwnGdTFzwwYJqxoMmKtlDIrO5_-Iv9_ZlFPny4Exatab9ChUkfgDKaM1ASoVJMi-WcNCuR4RqIoIavaavIzWP_uQrN-8xdb9rIv',
      'ATtYBwKBfOjPi-tUqg2EMKIq5rRmUyZR9xDVMx16zJEYVZDyub8g1O1uqTBBZjacR5gcnhNr0plFjNLi4PgqIiEXLTKlwZJuZIIYDkdInKNrTSxuTZX1dcabhz02Pf15JNpwyN-0MRy9mUWbQqg4mh7sPDHvXDalRZwYR8yRBLtaC6WLs9NB',
      'ATtYBwL5vC0TMhzdFfaEi5RoDJ7qlnFJY5URAlgsJjf_SLmg0XjUZdfB4FaY_2RXpo25dpbYga0PUWzBJ9nn3qiRQnuSoJtPloRLQ9yH_CNppALZ7-c1Pg7k1iqztAmi1U7qAGy9i14zRYvRqtcobsDccLaWCGPIhs2T68Yr5uQkzVoKUHtZ',
      'ATtYBwIIxMA3bd1atRBJFWURF1cWgNUgh_3X08-VIuAQFlIn7XPZe21ZI44djZsUKfcUyNeFRRrdBxBhpA9Zl0Tu6BJmAqh8fWT-PexgBEEBXR5BGjGAkPSYqFEenfVInEvI_8ViEf7ytDzYklf0IthvwsgLBapRFfsoisYEslYpo8iU2mv5',
      'ATtYBwIHRZpa-8ZOQ-ZhjPOlDuh7ycyiDfecvU4BtAabsQDogj8IlqkUIUcF5zziUn3hAlKZzWgUe5nLqyfNQ_uk92i6tDvrQkryr87bTXeiNmKZzLDma3hFfSMN3jjfud2MY41ZGZBvr9HfgvfzhjgHTSrUUtckKDn4eQ90dNozYM751M9i',
      'ATtYBwKL-_tVAxfGMf4VKm35wboglOuF-Hxwk5fvwXGhZGe3lBYK3bhGtS7D_SnYoQRvvEtqIHUTDEv3WKLvRz49NXEQ6BlrqxMOzTGMyJuHgqLTY5lUgmgKE89YnlznFeVAqNF43WMdSrrEur5tIhp4L_ueOe1oSP3fL8wnDNm4G2Ntnotr',
      'ATtYBwJL6wA6gJPvPyCK_LaAIURHU9XlmpZNRgY1u8hL8kYOA1ynAHAPqyl5gMjC2B_v3-uuvTa31awtRdciQ8kaOqNMFxgCAkyV76U_FwQuB_QXqIidDqs4k6yIZ7Jmso9Md4HNF5rqHBCeXIxlPXJ4SpEYfDkZBX-_1TNeR6EClxWgnYmf',
    ],
  },
  {
    name: 'Dirtbike Travel',
    description: 'Chuyến tham quan nhiều ngày, chuyến tham quan bằng mô tô',
    star: 5,
    numOfVote: 74,
    distance: '617 m',
    hintTime: '<1 giờ',
    location: 'Luon Khanh Thien st No 58, 12 Lane, Hà Nội 100000, Việt Nam',
    phoneNumber: '+84 4 2212 6886',
    imageLink: [
      'ATtYBwIWjCzckw4bsf9fX9T6s_Zudo_vc37iEGA_Pv7f9LFr1EFAdA9C-Z-Req9r2b-AG4tW6DP5tpgbSR_GzpmpL8gXTTMP5mIaNi7-fU5Ly0chcHKXb1Z38NBn6mU195_PhUB7fewX2y3wnN_Ngi5_thDAUtJrWau-5GHbq2VDt5nsigRa',
      'ATtYBwKLH7yLGHoSDQBL43eXL6VpIqnBuyIRQRKe74zKnKNx1Fi-1R9GMqqavUl2y5veguOQwXYvw8YWdPz99-Yf5JF6LMCIj08DNTxKn1j_epDeRhApO5wISWxRr65rEKJ4Zo6Kt0TUX2PkxrqhCSBINh36rWBiwuRu6mR7Lg24hVq1-L1K',
      'ATtYBwLGmSSrHpRxKg_XBQHy2pXY6hMgaOe2SbX1ltnZ75TKJbKq8l31Tin1lRs9r-yNfayFESW6O4_mcY33D6bJlNSpOr-MX7yBPfMMz__LKoyhQp8Hva6Nfr86jf-UtoosYJotLIFaUmk8ArcEOTViWcyMO8FvYPfb35btv98DDuXAU4Gs',
      'ATtYBwJkws_IS_21JVrkC2DKf89l4e64C6LAQ2NLnWkTZ2JuyQg3-PWQacglRG3CT5ADC8Ys1h-KuKZ8OirjAxi_diPfQwYfdCxHbZ_NpbfO1AOsU-1YcVa_se5ppy_d0P-PpZsk6MoIuSrI4dxz_GGUxxrTpx0gexTJd5d-tco_f8p3B4HW',
      'ATtYBwJoylnSVOqqXJSp7irCbe-zgF08wJZrW8s_NRDTHFniTCp8xcpN_Jc8WgSAe6q_5r1GZkENuqxApsF7pU0l7Za_RsWJ3J6q6uCdFUNpAEx3OYZP0ogLpewQuChTPWQmQUDLAKleXk0Bxn76C2fqb2i57wAMEZSkOEnepMHlzS_2hM4J',
      'ATtYBwLFotByh2spU2M7Wq6K6ZSCKooJVbFbOPhZxIM5dnI9RBlI36-mbmcI20ZQOWjMJcSi5RRHDYVUFIANKhhH3nVSZiRljJAvWorQDXrZ07zL_gEYbauGllad5JbR70zsNtP5zeVKf3-e3WVqFMD2IUmEKl4Tws8uAN9eOFggoWLyZAhG',
      'ATtYBwLLaBDygwLjj_nAGFXx_wRKBJRb_1AxAKPyKKBuJLzAjd8RKIUcl-pSDhGTs0g1-pVz9lmCd_Pmi0RbyskOA2oP_Uwp70mITgDtV_SBL5qNgUHKrXb-B_J5o5mR_eZYPS8FZXdrzVAG8bcrSYFg1ZIFyZhovnfFv6XwrhEgsO5yTHy3',
      'ATtYBwJ9BiuQ0a4m4ujHonweyBCGpncaBP5a4YD3TNrja69qalWAzNKhIRVMnaKGkPQPj0H8k-OwhknzpWYUIscpLd5iQiU6HtaV20tYE0a7EJtdYd3mqJcJeEY9RnXxqkNWyl_r6lZ2jRptxWh4HXJ8zmy1JIeXNCHikNN_euwjqXHhilNT',
      'ATtYBwJ4-43innfhZlDO2VMyLPW084WTcrjQeZu-OXPyBx60NoByChWsZd2JhHk9ifGrk0H4Xlt5JtKwSU3R1Fdf7aQm10exZL33orvuOWGObuZnSUra5wTvshUnBAkfAo_4QRuiCfAdn_us9L98F_zjhRoqT_143Ug2DCrsVnqHw8y7es_i',
      'ATtYBwIZn5HHEg2kyeKO7236saVu7uq7hDhHcrhOsUUhu82_iVRws1dN_JcPWTG5gHEfckpQPjEEzRiF5tikJW6CXEOzsUtSNMMSBhRNKQmq7RWNP4RppsZ3-K72twQToP0G3XeRF2Z3hO5Wx4TufezLju3ri7hWEEu25c5uLsguV6-MqmOR',
    ],
  },
  {
    name: 'Vietnam Tralvel Top',
    description: 'Chuyến tham quan nhiều ngày, chuyến tham quan bằng mô tô',
    star: 5,
    numOfVote: 257,
    distance: '540 m',
    // hintTime: '<1 giờ',
    location:
      'Add: No.13 A7, Dam Trau, Bach Dang, Hai Ba Trung District, Hà Nội 100000 Việt Nam',
    phoneNumber: '+84 94 289 08 98',
    imageLink: [
      'ATtYBwLqDIgtSWgr4JKYurALm5ySF9o_JSg7JUHnsFgJmeQxzuh8hunc0MRiCMLfyfCc5ziFKJCg4l0VK8aLtPHdQAF06qQmGFS5y4bCxWqWNJJ-3YObbsroZygW7H4k5H-1_CPXdi4WrL-2OiqoCf3l4aY3IxF4MhN5hWiqcZ5dijU_tUwY',
      'ATtYBwI6Vv-IWKhyA4hTlZLsDycejybci9Hq6qLx5CybCF6Dejbd8_kFfcPYlKpazZv0whXB2tw0r4qQTK8CGhtTkMTWZomcNvWMoJ_WDsoGu8qKJiWA7byNgRhTiMYHWprrPDHivhlLOZWdG2O8YPwIURPRtDoB9L_bf2hhipo9IGcOxjy8',
      'ATtYBwIEerOKXpL4q65iptvh_OPWbCdIWo-5LU6XNzwJNt7adGrC6LL3KEanGzbvO3B5DQQKeAutJVWHBGdR-AHGVIrBawKLMC4C_9Z-7pXT5F8bkYlAaLuFYzngP1RYG2lcrzP4C2cdXRfYtFdVcwseCF6VWtQIPIhC9L6Am8TbXJ4HIJKH',
      'ATtYBwJ8vf1LgsMc2yFYLF7WcbavQ-4FyKqjWmZbHGX6qAghl480HfNQ9MB3zGaJ1Upv4XNo8byBro45Ee3-gD3h_i63u9rLycggvWqZPoqpujaNCLNu_Is2tFXa22Y54PP7osSj5_2MCVFks7BLbaGZnpueftSC8tYBwVBaspV_xrykoc-D',
      'ATtYBwJxmRGIZ7cyTlwx3tNy7Rw3QzNutbWFgIMiyTPpsAw9GTliGKQwxAaNwBMJqyK22flXGyNwd4cdlFI62W55ke8V0Ts4fAnllVavIzf7MECyWpDKcl0Rd_Z-3gU0NolHG2Lunn91GS7WyGGQGKk7bODeAvLKKkk81LP21b2jgrujHwiv',
      'ATtYBwIbJuEWx7gZqWyDX73nL2XWn3g0mgyFnm58HBsN7tN-fPuS0AUyOByYqLhIYvwM5fXbVjk7SplZjdg4OHkIgjO7t4Y5I7f9NK0oQfBFQGDotO2dLrj6oE5O1Lg3Bi6sv_nTMxpYCLMoTmi34ol7t9ZnPHGARvtZk9G_6CXCiiuTfggO',
      'ATtYBwJrW-CFFXC7bEibOfGuIyqHdy0R55y8s76Hd0wHJ2WjlpBeYoNHy2O5VO4Cvs-C8qNctqtDWVUdS0xI8ZDGygx5vNGwWHfC6FB2Z5spAw_vbCUjNEedjNbMb8liMBSFg_jZj1XBVBPLd9sISUqbdkZvxHLOLDd0xnH9c2DLFvEMBWKx',
      'ATtYBwL3F_fzqQh6Lt4bxNovmOYaHCJKyC-ia8aPta4yqiJUR3Bh5Mi58T2bSMFIkoUM2NHG_daaoKVBIHHKw8cYc6ivZRqRNeuYypxZbUcXBClArs_LA7lKrQxVXBNRd6LSZ67AYmqPLS3prv_0RO0OinnmWwYYeHxQAuWAPQ8F6CU-_ZVz',
      'ATtYBwKcz-THpA_9EMSe7lrnqo5ao__eciOygdSbqAEaCzfVxMy1Bvs6a3TJR4oLH3xTk-lMjw_OePkryTVbdgJL30HD696Y3KMAm2zkQsGyzgL8Q59ycSqAxWTUEPXzN-w4u93voJnTThna6Hy7yZ6wqHqWrs3Ld-hXvCsIemMVgWbju_Jq',
      'ATtYBwIaY-L6_wMtUKpYrAsVwr0Jg7rJj3aJeafWTPhv4yVswqrUmZVKjB3pILW-QKRjFWpx10CPht3Is2pX6HZUFSDbxl9sHWcKNPuegyr28lVvLVRTWmlaAWKdROuhuGkcPG0MN4z4SXA3D69wqzOmFQacYA5Ogg-Xs_H5yrg-qWoCHkvt',
    ],
  },
  {
    name: 'Your Vietnam Tralvel',
    description:
      'Chuyến tham quan sinh thái, Chuyến tham quan bằng xe đạp, Chuyến tham quan tư nhân, Chuyến tham quan văn hóa, Chuyến tham quan tự nhiên và động vật hoang dã ',
    star: 5,
    numOfVote: 99,
    distance: '547 m',
    hintTime: 'Hơn 3 giờ',
    location: 'Hà Nội 100000 Việt Nam',
    phoneNumber: '+84 98 766 60 25',
    imageLink: [
      'ATtYBwIuWRm7o6n22-3dt1lYAXKB5DQ3NfDx7WZFN_jqCBYMPkfus1L1Rn1If5wZAcZqm_-pudlBz8UYqdenJXZCuWh6ueKXeUCBSfwaag1cQqGLIQWL0iVM8xjvLewGX6f-P3s1n82d9trWe1XHXeHeRIQPkPdBgye7x0tEUtmM9l_O52ED',
    ],
  },
  {
    name: "Lucy's Dream Fashion and Art Exhibition Center",
    description:
      'Buổi trình diễn & chuyến tham quan thời trang, Chuyến tham quan văn hóa, Chuyến tham quan mua sắm, Chuyên stham quan tư nhân',
    star: 5,
    numOfVote: 25,
    distance: '1.4 km',
    // hintTime: '<1 giờ',
    location:
      '2nd Floor, Hanoi Creative Tower, 1 Luong Yen Street, Hai Ba Trung District, Hanoi 1 Luong Yen Street, Hà Nội 10000 Việt Nam',
    phoneNumber: '+84 97 639 88 68',
    imageLink: [
      'ATtYBwKYEoFSmGtLiMo-zN4mjuP5knVdpzorsmKeMcJX3vw7YV6_sz_wCLIWO40JVm8k5W2-e8-8imzrOvlmiXxTFSLBba3jSXTG2kTVZ_My-jpege7upJ4-Jxqq9vMYfozLP6wsNgU0rrUV95BlKUuHPinZapetgE1PNDzLG0wKywTlR8Hh',
      'ATtYBwJottT-tTfW1E4k61xN6pfPWshllbQKo5tEoDsn1WubWATM5cJ0zS14FDzOunjAhskW4O8KpMjbmTLEsCW4acRKwt0CxUoYxlQzWHvJZcAN3XMtPlA_vYrT0AH3tYloxeo3kLthD3W1vq7up_dlfxRt7yvPIdShtDwsIpdDNieJ67p8',
      'ATtYBwJzPWOWGsMhZt3bj5HeAdvW-vWGP250q3TV4jiZ1pp1lXDddOKs9s7UrJwenOiWncgpEm9UOCSD6boVHvpDxolwu10YFxNdP50WK4iYLBkQ_SS-LoHc4oFBNAwZeOqO4DGmhMkLcLvHz4Qglw84mf2SN9X-AJVs_8us81F1BEoCgC77',
      'ATtYBwJ5hfxGhdQuN3GOZ2XLl-4GZyqslDEu4et10QcYes8uZmR_oBwaWChgn1O1vD_L1IdZkydB_73_4czKVD1ipOycqNUxTXPPBPUyQ-At-nArITOhyHQpymK3sjUI_I4BfS_l85bZjHZdpq1-rR_HsGquwFsrD9yKIsIdnsUroiMgm19P',
      'ATtYBwJYwrOigCuFsZg4V4j975HJX0vBE30atl6B68QiNnwgYjDdyODClCFUC09ynOHFtxwsFwlXL0TxlDpVVxgQHeF_NPziAPNvdWOOYXEpD2NZgqDFNqSTWZkrR7pYdB3Of1rx7n0sVVFjmeTaUtxUO_15bhHhgW8oz_vYRS-qNQc8WMSr',
      'ATtYBwIrYTATmZUIqJItp4xlqMNs47JLlJDZBaN2iJjOGLDm-WUwUyheilVgpdJBS8sArM6C3cgHxNyPzY9iGstvvCPJCmWXU7r1vh50makdtHVjgpYs5WCM8VB_H2LmfWqhwseH7mGqewv3D4NzK_zh626nJ5hwkyb8C5l1Ybr5PUjakIw_',
    ],
  },
  {
    name: 'VinKE & Aquarium Times City',
    description: 'Viện hải dương học',
    star: 4,
    numOfVote: 80,
    distance: '668 m',
    hintTime: '1-2 giờ',
    location:
      '458 Minh Khai Street, Hai Ba Trung District, Hà Nội 10000 Việt Nam',
    phoneNumber: '+84 1900 6677',
    imageLink: [
      'ATtYBwKm5ag6LSqOmGwfQUFlq5lo28Jw7iHLpPigKtYygAAloYgmo6Re4jNNpE-CZHavtwcYAck01j4MYaySCATwNr9zeTEgF7I2mDU9wZTdZ3_htUFXHedUxZ-lj9EawFJryJUrJdxwjjBj7537KTWcY0rHpKTdXJiG0OVsQ3nXAaEsGQlU',
      'ATtYBwKGD3QaM3G5KICpyI29ekdCH6fhXEEVQ23mr9No_ZaMZ5iYsg9AAy0Kn-wPRFyYhOJXGbySCldwfwNWCRqLupMspTDqR80lCKRMBR64Wz9UhpcOu19jMSjwd5i_EZ4zz0qFAoonibPrn-rTIcrE7IMRnt-7EgkYYdLxfCDB1xsPXzK1',
      'ATtYBwJHh_CpfJU0y5x52vFMns-pseeqJ89u6zyEhvhjrZXarSELmT3T7GjlercO01ysjMJs48Xd-g7AmP4p_5Z-_RpZsHJejjNvLT6az7sLF_x1x7_gjaSP9vwi4JlIyTB-RpKP-Yk4SFOgEGf3wT6zHQYtAzucDJ4xqq0Dhws-7ezg-btx',
      'ATtYBwLCjaDbW7eeohntWtVU4J8-NkrLLuRnNWlSCtJk1i1gaBAY1koV4KcpGqBZJedofbbV2JosX_tohpw_I6CEjPUHfWR4b0_V0HMQQRm2bzmFC6SYlHA8bGRfk0Z-haaUG46oibnVpUdfl1bI9meUV2m67qLTDxQH3sAN308-WNikx1U',
      'ATtYBwIX9tzHmnXU5BE83nh355UTeOqq7kQFAVBXaOt-tKW7i2mw1sJ9f6yVs-KHzHQvvX-_G4sUtBj77BALPdrxapeXl_yek7RwMSRwfp_x9blPhiNbtMqpRHTV-wMYjuT7X7__79VYTvjkxEiH0HGTGKDjYPKzCBJDoOrqbhMIYV8zd53-',
      'ATtYBwJYeDhhrHGdcqB-elI3RXBfkufrHvph45KRl4rC45WdvHM-KnLRV_ZgooFy8f1nyTiN8-BOQa59fOiWIyGKq2zFAdFyfKQcAsJFlTQ_axKaYKJ1bBdGcvYDPVGWHlRrAgyp-WSGOhPNYhVqFEZZvRijoz9mFWs-814gvPt_8NfGk35Z',
      'ATtYBwLqEjNWA3apUKsU4p5knNtCDdpI5e38K_itT94MU-tTzvFT8PEdHpcSVupaDa64FGEXsPKXauzsllUi6fW976kvfhc5hbpkycxmANakPMbrujgBvpvIgs5V76PM9eKzdGjDQFYxjMUxxaQ4XV6y-S9g-azU7uH6Djoa0wrs4nXgEves',
      'ATtYBwKlEaNsn8DNZMc2yRQjDgqdfJCjB97yOzVs1yWscSIOt9H39lb0FuvguieLvX1sKsr_gplUtgl90ZKoUXXDrjWHTVUxqH5747k_xpSau9duxXzIvW5xaskQ62OZbggNNI0wXG65CLh-e-Yz5IZAPL1t63wILjuHBFEB4nhRyRJUdskS',
      'ATtYBwKdTiYHEiMxoqfcoKQ1eBkW-dwQv07flpNizVlGWj2ufjZ4ljAO6g4TM4egji7hI5yxoplt8-wT9XYDaxPZJEGNb6REl09nA28_XVqtb1lX5G_q4xUZd06d_aBgqX8b_n96grkfpMOJMitdHl4Iz9OFsMkaU4pc_V_KxbyoyBsLA2eJ',
      'ATtYBwLAcuydkQl5OmQKW0wVd-Rt4FNwanw44jlosn64TvbpgnehoMm8Dakmv-j8d5wviLIXIKgIMnklLxPr4yGpDkuXQQCMMEwBmJHKZbs1tPXwZEPNc2CIVKl5ORDTsbE4EwGYlaFmVQBc1ct2PchIoH8r5DKYJ248qTQD3nm2mbaIilPQ',
    ],
  },
  {
    name: 'Marco Polo Travel Vietnam Mountain Bike Private Day Tours',
    description: 'Chuyến tham quan bằng xe đạp',
    star: 5,
    numOfVote: 81,
    distance: '1.2 km',
    hintTime: 'Hơn 3 giờ',
    location: '49 Nguyễn Khoái P.107, Tòa nhà N14, Hà Nội 100000 Việt Nam',
    phoneNumber: '+84 91 357 16 87',
    imageLink: [
      'ATtYBwLGF4BNyBKy2FuRxD0uCbgAvA0nncuB2RpyM-ouroy4S9Hx973ANTT9FgZcAVlEF30U5ZKNBfWR5phjeetwVE5pgee1eusiMcagBRC47eJvC5WZByxPfr5MShOojMqGdzMV6HGwjnUOHdMmA673DglkUH3b7vVOgedAYAe7UBleWx4X',
      'ATtYBwK7dcXmePq0QxXyRsge53ugMAkEU9QauLlnD7w5WsLHH6fKRyGMP23fNQm8WkwN5Wkl5EoHuj7APb0Q-4B67Lx5BopOTLymvbNzYs4C0C2cKXiaMBI8Y0pwk47fzQsFNFKnqAmk_ZzMGDY5L6lqw0YA6PKPlOB-ljFignvk57fefXbO',
      'ATtYBwICGWXzRZWjRJcVWxA2Kx2G17nchJRis7EmPAgcMvkuGmQP75MCZLIog9b428T6oz5qqXtiI0mL3WqavPFUO_lVWgKABiojSRWNRqHfRoVWO1YNLkJsPpoACyJblmBvzUHRSFf322BNRTfS-xyf6VueqivKYxCc1_dtsHculF5iLuJt',
      'ATtYBwJfxTm6GDf-o2QYnz3FMeFlsn3KztsN4QsfjqRxvFR6gAWjwdkMGs-MhXF0aR5Y3-5QGmFfSHPV8sFanuTcjkrje_Dl9Dz-yC8QZum1SKQSMezWck62kt3VmnNCvnZlcSADOa-6C774O0zwH928jwCkPt5GfJh3ddzyzK46IF5kOspI',
      'ATtYBwJS-HJ8dPX3VM6D0AcXk01wXaDfNEBgTEYjB2QzontBssvVvVjfuE7p2iKjkMGVqTNN_XQqgTT9Q8fwDcFPvcCJGkfc7X4PQHQvxhCkRHYoyONHsZTvTansQHCb_LHF2QKcKbCSNHeva-2OKhzRveUL2P4rvE-8TQSF2qoEOvziFSVM',
      'ATtYBwKBNeIvgIXFcOo9IOxArS425UGAbQ_KQf5sdPAee0UUTMLszXrKwj81UpnqICn7TCo8NH3Y6fuwlDmqSvy4uN_8VnhCdzC-zCB81ScCeYW_CbAfrx22pZsLiX74VdmAADQvbHRBz-_pD7osKV4liRFgQFWO8gYiIghyZzlpMRyINucQ',
      'ATtYBwJq2hfXJc4wvZtb87cHgumqUGOzl_2ZCLM-vzXGvPTgNm3kqAlrd6DYo7s9Ui51JHYkpntDsMaZ5A_s3jnuwh0GRfwjK3X_EYHOj71KWQ_R0DJVr1v-4qIOPP5rrZkwXdaf5H7RExJqCWZ53NcaTzMkk41PKUKnGkn9qjF_CMBPphCz',
      'ATtYBwLGM_ooHz3Ufe2JVg-gmwyKn85mnqmd3d6aWDC9nT370zWVDFCClKOn9OOvdt5ar2y6bUNGx4z3moQ0AJdbtF8Au6US86TafLFgXx93zlSCDtvr3uCUvHI78f8f7ejqrO-1N0tz5Ssp8tHzooitOToRiuQTD4vHeJoKwgMvAHy3R9up',
      'ATtYBwJs1V9gx1TsQE5j-qjD5_LQWGK_-cWdNsjkTnhxhE1qRCYSDfQsaRd8DPhn_9zXXZ9W2XE6bHOZFwuFN7Go6QV8XkUTmEMY5HqF4BeVu79DPqirTfScNkqe8a-rbQvKCXvcIObhBrIBpV-woWGh8NtI0qhAgpcY2IGghOpMWhjJo-A3',
      'ATtYBwKpqKQHFpJ7O3TRVFbKA04Sd9yogeE91eycnmH5WSqlF6nsWdI6UvkhB20E05l4JUxs435e5UIzgUoiO6SqIUdJzKrRvjsBLj_kvicaT13A_8RDgyoR7FsVIsPtefM1EE2fQpe6ysvvyrMoAcnUYQ-wtVrNNbRsLh1tkXwhnSyUezZo',
    ],
  },
];

const secondFakeData = [
  {
    name: 'Lăng Bác',
    description:
      'Thi hài của lãnh tụ Hồ Chí Minh của Việt Nam được trưng bày trong lăng và khu di tích lịch sử này.',
    star: 4.5,
    numOfVote: 15022,
    distance: '6 km',
    hintTime: 'Hơn 3 giờ',
    location: '2 Hùng Vương, Điện Bàn, Ba Đình, Hà Nội 100000, Vietnam',
    phoneNumber: '+842438455128',
    imageLink: [
      'ATtYBwIeKH4V8kBs-T4lJFugx44WO83MIP6mXRsvbowGAZdHPLUCdlkI4djgXDPFEKICMGpQRaWJgLsVnslQO39nI_JDpSEspP0_yRZLm_Qal7P4rC-m42p5xISmkq4YzrYRDUeMh5ZiMxkljcOE5lz9VqiRadS3eCVJSYpivyk_pmCDDlcw',
      'ATtYBwLap14q8fGCSL7gL9qbGHPEHch0IjUTWKOgiDzGDtj_rWxGf_qfZNetshkKow9tnQdub6cSPAqw877YQEkCoEp_ydDVXJBh85HJSpNn_Fm12CoMcFe8mgs3ZMNSq5j6UmjBzjU6NfFfmcfXCDIjrUU--OT3JALRRw984UTtXAbSJ7sr',
      'ATtYBwJ6dCK1mMW4lwEGXymAGql5lCOJ4-jF97Hb9enmpRIGjDMY-P32pel6iqsxcXJTr9URLPqc4cZTU549sXNx6-_ksna48OISpyuU1fWxFbMSDYP6C_lXkVWY2FvFKN03oJ27winbwzQu49ujd1qSTgcoh-IIBqj4k14HJhzrSmUwLMIM',
      'ATtYBwIrATTUGiePSuCg-iQ2-vJm03veUdxCTkhMUQoP7qY2Eu9HLPXZXY3Hd9k8AQjeR-LU1oJE3LcGA3p52W_9HCuw1BRLglzE-WrNYsGM4C9S_yO6nfOKCXjuVZFglR90wrno0u6Bwy4O7sJ_Cd6ZgHS1ZOo0vDW8BRbuzymkEX0TtIf-',
      'ATtYBwILTOgGUvCJir4_os-HyPitFxGEqVyCC43tIFLXEyY46zSC7jOvseFmyO6u1h-4uyGzzQ-Wa-csZgMTUgPBsl4AfgNfEZrpHXpcB5CZM66pFYiJoT5Lhj0T4IrE5DzkPFq8sOOVqvTUujsmlhCBw0EPl1f6gOV51YSqRwKZup7VZVr_',
      'ATtYBwJ4Cle945WIyYSFkEcZZHS0GS38jBNW4-KLORfPSaObIvdi2VIlXqg1RajTFYN6ImJ9QUfoS9IczqtTI5OKAvRlKz9-VAuLKNQvkiTO9ZQFTCh5na7hqLOWnc-wBYvNvX-hdUvg0z8ZrA0-pPpTzFCUSw8oC8Zboete2YNNdhkrWNDi',
      'ATtYBwLQ61DQDId925Wt9FvTRSuUiRgfXFc8i3SEosA2k--1fFCxoROTDTDDzILY5H9Tm6UQwJVIpZYiT3U25dt_pwoGrQ0-15bsCnFYL0VSS0JKZioRjUCNL06BMRxkwBteahE9SZUh4TCOUbMUbOzYCYgato_xamvMvgy-ruNKnqclLCdW',
      'ATtYBwIXT79RtoU2d37_Z0hthnmPjiv3p-MXDw4RcxZ9bywdUWXBNb8eaa8nAoI8ql0yVXJvzQDQ-gJ75hI57biJFUw4g_VVWJc6s3iB38fDnDDd6bXp8DzFd8hvBjt0KJDFAZNgKL5xeccYKOW1YNWExqCtdoKxd2xmMciynqip38nZRAOZ',
      'ATtYBwIegMJ2mivEHaQO75-jiVEaSUQFbnf7uzfKyYu9NFlPkRkvZCqD610GevU3kkBKuaATKBC8bRJsUoNzBF8P2zNYIA1BqXfdEfxFxvbzS8zKtEvVxlfHvG5lyuwsgIGz_elHWRHukMZBthxxu_ryOCpgRG2GjbOK2FjGYFLe2iYBoDE6',
      'ATtYBwLRSrrxbZpyK20t28ySBuVNQAui1T9g2NIOiy62xQQcVlhDLYPfr_QJyfwImr2-MhCebECp9xWs4tcBDY2SH_CeUo5KNS9BKGvkETmlqboiQMPGzZAjtfBXVtZJ0v9NLxDT6ZVAf4b2R4mVg-jQ8_gCfTga31y1lqjhOS1G2F1d2Yus',
    ],
  },
  {
    name: 'Hồ Gươm',
    star: 4.7,
    numOfVote: 2888,
    distance: '4.3 km',
    hintTime: 'Hơn 3 giờ',
    location: '1-8 Lê Thái Tổ, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam',
    imageLink: [
      'ATtYBwKCEnkfQAOIls6vIbWkNoJSsarQzglmKFcwBqMlvPLal1VuDSQE-wYi_934ce3y_BBcgykYat5SSwjedzJwW03x770aM6ayqVrgOVC0hiK2MpCEdggQcKi8xjj7U_vlGojQFyXP1gwsReuvsD8pB28GD7mSb8CUkqqdH8IIv2wsyzE',
      'ATtYBwLyS_sZx1IkiAfq9MAUOde1DBIUInr45Sdth8on98MW4XUFzLbPfXgSFyd6Nf7QCEcUF8b9C3Wzf7sEshIXhaw8ybuEjpmSK-owwSgAm9IyZAC6eq2F7P8PGlLlEalI1CdQB0qOa25xd69-AcBLHpKUjr037bw1isfQfZh9n5_B_V0y',
      'ATtYBwJ1IGZbGc51YwrTbmnC_qr97gBcY4H-rmFeKojfnaORLvVh62SKaHNNMZ2yLLRmTzO1aU_g_m86-6oGPqCdQrWG3b4Vi4c18LJy3bw2Gt59K082_WkYJoYP49RGE6WvAfosc5i4iMM6mq7VuIQMuZ0ZHZVYYq9RFrIzpDmfuEAzvjt7',
      'ATtYBwIusc3o4hlzYubTFWGRpnglMtKf1xHrnFMI3ieSGE9oxikpO-qnWYhW6BEZTus0sn9TgbxiTvEXqpy93ihi4g9NE3cc5CMQYQzvt19EmJQT_fGaJCWmOjE7tenkHIey81dY7wVJ7qg7wCbkR069RP4X-I_UvD9Isma_0aoxPJzMbCQf',
      'ATtYBwIrwgKbTeubrsYTI2UVG313LHtOXVLvDJ1BaI1D9d4q7EWTA1YEXNQL6gHuPmBdkwH4Z-1AGg1szBnuFXyV3wKk8XQxTTRpg8n8XEU4swl0LcZl1eBQcjFCRNRpPXu_iB8_f7snhp5eVIovAmEx_9o456KWHsZ-RuJyC87K1yq0-5JQ',
      'ATtYBwJSuskcY3mBBM1-d1PRh4WPepG4C_glbPXTRkxydXuyTeja0MdidP3QSqdL3e5Y_40r27PSVRUJ4-QrMBJw3EKPArFI2AQ57LQH74XfTU5OzuD-75FuNEgzP6GFXcMnGiPrd1TQlenswtPpP4MgKPOad8IQMzy-WwfTiguDiQY1zUHf',
      'ATtYBwJw_OYmS6SSLwFiE7ppUctMfZq7I4dj8jOC6fIcYn_I8taK-0v6m5gMypBx3hi5LvUnDmaC0Fs23eJ5ggzSEjyCosHfFFkEXGmYSKMKu8nic49pn8e8oR0tGtkAl9eDB84tPII_ia0etNQjH2OtlpQ1prxgSMNrdJ5577UboTq9Rv9C',
      'ATtYBwI92P9FEEyvb8ibifUZ1E717P27tOUEBngb_sufsDs7JhqvLXX-5xAqCpi1be5HJMuQCYMl0LDnuzuSyZjfBdMfPCo2NXsB45OOxSVxjL0H7tpkAF9raCLjQBltUYLFzfh7r0SJrYN_irhhi4v1336T61cinif4-UtzqH4NKniR7I70',
      'ATtYBwI5GmLdzKIkFm_Z0xNL7gix6NnlOOrFDgr_q4x7LFP-IREM9Q2shpYwR5zwfGzRxkNZdO86BfO_QZqRH-d4aPY1Md93nGDyYmmjfeydA6Af4F9RJCiBiDWUNLSOnIsnEIVKIMPKIBKIq0IkKSqY1y2kept4SC7hMZOvvdXG2pFBGU2U',
      'ATtYBwIhPm2IoDuVOOeTC9a9AMaik5I5xaj51PsGHsqoLR4CBzdU_hub0_XaIWpqu1FJUNyATmzhh2n8BJ_S8Alqzg7R66xEGUXFJQWM4hezbFpIV2-tFgQH4biI3VzPaECeTBl1mSnk_55z70KciF1AiM0s56-SRxGgtLSNw3_CSQkAwVri',
    ],
  },
  {
    name: 'Phố cổ Hà Nội',
    star: 4.6,
    numOfVote: 403,
    distance: '3.7 km',
    hintTime: 'Hơn 4 giờ',
    location: '57 Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam',
    // phoneNumber: '+84 97 546 82 52',
    imageLink: [
      'ATtYBwIUjJn9h7N-xhXWRBAwdSGTI2sx5rA8jMu2rw-xZ4F7km6XVhinjDKch8EZ6tUCS-4Q6emBy-AssBFwJ4nDcPy1X_OtStrGwroRD3CE8s09I7Jh5Ia28OcvUn874uceYFcHIYFJysLeUSRXfH7kEFgeE03Ast6n9uhBKD0ccQkNtdqa',
      'ATtYBwJRVaLP1AhwAkOWoYgPAbuNmHmD3jUrhEx80gBXFHpMaMOxPEpeKUW8Y063FLSNHxDeCStL-2ylacph8gbOoQg-g3EffxnPphXOkNyf-Gy4MJ_8B-3Na76DzcNR1QCQLDUbX_gsFE-bZ2aFo2OBbE_wOBBWJmNwIqFc1dbZexnS4ATI',
      'ATtYBwLp-Cve-8kul1GkB5llkxlagjrKIwytJMmQvUBlQ2HEPiOhELknFBEhWX0CGBtIxYdJt-1VR3ElDNHZuacm0RIznXmPTsb-mQIApmtYdjPzwjaq9UcGCAA_Yz1N1I7hzZDA5ykfWf4BDCj6H0ODo5wrRoqHaVoKTbnhDPLgOaa4mkO-',
      'ATtYBwIAOTMVU48Ns2yK7rGw5w50IvXrbwa2xmV2FMatvvAl1csZsbwnIMVFiDV5AJ92Wl4FGcglxzLwkB0u4RNZv-8U2a1MwtJdx6Fqdqt91ST5K3BBdTaZ28EzD6jek0_IOPFWJgV602akYRzX2yRZSFfaGKRFXrrYdolahA8ChKMaIIpn',
      'ATtYBwJjPgfHqHgyjoEh2sFyUZTAORDw3JFnRgjNKy4G7W3ZQ1SeN9aBmRudLZt8gO0vV1wviqoSCjg28Pi4kMlOHdwxun5E0NvyCW4961t8WtZiZSHqokeJZopg9YPV-CCDlimxBCr4RC9B0ql9gKiZ6jPJPm_qrfRQP6QLmciZziwImW3s',
      'ATtYBwJYB8pm16_7XgWPPYukeNOq_VvwYkU2WzqwdIVyRNVyzm0nk7J99UySSqTvxzgew0pgyLMtgajBcrovpBES0XpnCavsOLN5wzbg_7K62kRcIQH6zwvFIdZLx4mEuVx4d5H9woTmDMI22oUbN103Fw253XBMxTo91_ldDWeM1VHn4KsG',
      'ATtYBwLot2zYeoDQbLg2_7vMrop35uu-R1_vJbD7knhibmN2YKcxQd1-3bce-kchRmoVVmpiOuqRl9Pw09VE_9jEO7FInUdgALQH9njhVHYVzHE5hhE3JEe0ZHv0xJ1-YYwmpLVv23yeJSZD5hhPk9EN_J-_UzSesKkiMY3H4wR4kozmALmJ',
      'ATtYBwKH5ICU7dJEjFBJjJuAI-jPfkrHNF475JHce0AopaP2W88lMe8p9n7CAhgxD1t2kBbWEXJPWRc0TCkTjZCorqYkIpykp8nk0fEpEpFIH4rSmWIekrwPqJol_HdUfp2xV34pae9vrLJm1p-cW6Lgy_Rln7_rNITucYiJI1YJq4SIVCPn',
      'ATtYBwLjfM5O2Ki2IPPZEqwO_nAkWkouo5NCJfzE7kfXHD6G0FASiOyOqstvkmfPwKUizwJPtRe7ko4u1CpOuY0AEEzBcdmGQhbGPkm9sh8BYN9wq_e5LaVrbsKmqcbnICO_69wuR34DiQZBzQZKEPlKEap9Xl6pbJ7tYKeg0TddmTAxXfg',
      'ATtYBwJNGlWdJ9v9VjhAokrqpUT_TpzCaXxvoloYkF_6VovV-rrIRQ8_JQfJD1cE5ka5-XGjrReOJ_uY6QFPfFSxOqeVoMtn8ShzP2JrfG-SZFRIzrkneYhgpTAokAXikqpXlZcpj-_l91W-3RgI4lDcpj6AQhakMBg4f-NZBK9CtvqOtPzk',
    ],
  },
  {
    name: 'Văn Miếu Quốc Tử Giám',
    description: 'Địa danh lịch sử',
    star: 4.6,
    numOfVote: 9069,
    distance: '4.7 km',
    hintTime: '1-2 giờ',
    location: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội 100000, Vietnam',
    phoneNumber: '+842437472566',
    imageLink: [
      'ATtYBwI48tXASHQgIjqHhtDARsbXljiY-pSg64ul606Tkcd610QdigGc4Qn9PjJ-qUGebzQKKEEvTVJ7fiZVkM8-PBF_TuO3or50e4LylmZWBc21uTd9G0tFwj890568Ysc4EF1swfWEb_12tWiDVK4DbSBx0NYRq4L9r6TUtWR3jXnHZDVn',
      'ATtYBwJQm-gQInhl6J8hfbnXmPNNp9X39z2zoYIWYFyu7jR8yKOsk86wBqpHgf5BEE8U7SduTG_qyBi0qWNbqwX9GFucUmB5qL6SnfjYhtH6JKyO0yDD5LuDp4rthWHXYrpmmbRrZZL4CSKu5N7OssCqSaKAeNb6ctGN69JQ5hRnWg9TqeGu',
      'ATtYBwJn-MP086CJIYgdAMWB0IgJze5gJrueBNOI4sw5euONnkts567SIYgVbnaHs20_oWKqyuwHjwtrQrf7MHRTdXcong1ekA6lVf3rCNHiZfZI8Z9NpU1WJbMxukmAliUr68IwxRwycuOF_FCBlWBxRuloXqRx5R5tcLRZPDUjeFSEbovA',
      'ATtYBwKg-5IP94VLkLhaBlpzUlylyInY1uv4JNJvTuhTG1r3EJipKcw_2eJpiro1wKoouQiUc2CMQCa3eQkGNVOvJyyu94B0WJBm8hitpR_dpVU7IqTz1J-DRjUuQ8vi6E7mSIaDQnhgq4svzY4iU4xODCtY5Qh9DZCHKSE6Jv0KNedQpYUG',
      'ATtYBwLrxymnPxYixi5sZQrHDM31JprQIg4tzEs8vY-vDTq8rzwU4ELp38JXRrQd5TOQluD64u4xPsgfdf07vFvOqE2JFQE1SDhmYAgu00g3HGrW9ShPkZXDNnEPjmFqbSfF9Km1pTtbgD2m0Qm___u7DpuJ3nBCV0CFJY-4sYI7f6c_cuPM',
      'ATtYBwKTQjSPONYvoKvftI-2-gS4C3jmJTG_3mCfyLKha2na7-qgXAICE92tcbyuuC_MtOasGpkH_1RHeuTssmnYzeIFFyAyD6svVIYl45hozSVg-hMnR_tTBw3P8Gm8mi9Byh5ezdTTTIEkGo-ewEAr3hOj6YJ5glb82-HVHtiOKqVmrnNq',
      'ATtYBwJkePzBYUquG0fv3pnkAQ3yPHpetIlSQYqr1RJCAF4j9BmzpMxCg-YMwUY0vuPmkEkPxjAZf4q2JIuec9yYMLgmajk6CXNWV3z9WgJFvIwGwfLfGQLOCmCu4f6NXpuGuviBfMJSYKiU1iMi4qI73wKps-3pEzwmxri7oDtZ5cMxRQrx',
      'ATtYBwKLqkaRo9fckXTzOpppUYt0JsbSU1RS6PUAzyxy9puQPqxR2DV1frj7vegp9kNYla8oVfHFR0qTmwMtVzEj3tyYi-FGv4KTbtIpypuBqN6MoJdbJ1EzsrgKbWp7NuPJx-NUiwMGE-mI2l5K4adTfw0e2ZJS__qfIMYX4DV6XA9S8qt7',
      'ATtYBwKYXW-HGeZHaLVTtFEMxfUc7NHq7my7Z4ruidrGl9x60M3B6OWR1TrTmNmaD20XFR8JFYQL1tdAmwP6Dmwvmb3MNc93235hpjlr3V0ZfRkUjt6tTyTJmWLBydYLB9oSg2DgPco28edHZEHwekgmy9TGSq3kbdc5NA1rJfQyewL_8un4',
      'ATtYBwJrLRAG5qf2eZ72GA7GuYPUZKBIluDkFfdZXaGvilEenZNf56nl3ZbQLHpcNN5yzJ4dhlO6j8bhHt0ZFwLIv08iWBD6yrN7ie_GnQPU8BKqekxJSD5flhY00-yLVONQW5J20ojLnpupxT34utfcvLNBTGD4HA8Cxaidadr8_majHZGk',
    ],
  },
  {
    name: 'Nhà thờ lớn Hà Nội',
    description: 'Nhà thờ',
    star: 4.5,
    numOfVote: 15858,
    distance: '3.7 km',
    hintTime: '<1 giờ',
    location: '40 Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội 100000, Vietnam',
    phoneNumber: '+842438285967',
    imageLink: [
      'ATtYBwLOwe26s29aXRcGHLowjh8xPaSR9RJPpth8nNTzX5Zakn1y3-V1zhPFR4NXjENa-s2wDL0gjH56b9DsyNWiGcm2uGAtfJEjrQePiY4rxVWdRTyjGAlgMSBA7ggHJv_iZ2SLv6RmEbFkmyXMpYdz0pNALSgB51vW2vnw67hU2x75slMR',
      'ATtYBwLM_ML90MXCwzybKlCXcozsoW4YSKPOtR4es7_EiD9cDDQoSfKS11wtKsb4b60Ubl7djpCJ5_u21AAd18qNFrzDnryh9aMNho4qmhJ5PEkrs04c-IZcjp92mrwyaCaoxlDbAGf2ZndBpG225lqfAOESt9JP-bnB4GcTgHTwRknOfS9I',
      'ATtYBwIozZnuXve3SI30TFW-gKK7FexpmqX1hfyRPT2pKx-rrMzcGTp6rCtlW5hrFOYvmY5Zj-cVZ3H3KlSPd7y0QbvCTmGKOgdQfFvAO6wxWhzu4iaWeUozONksu7m8fQXZ-f0dH0cY4VWu8PiDNilDeoGMq3MnWKnPQedF1K7equCJeKxI',
      'ATtYBwLLnFix9goM-1sgsyY6T5GBB34HxgGL8uLlwUPUvn-P-rsu6nWtaPdkih5aqNIRtIm2y2xGQUdWcEWLdWeYSiIWGk2P-Ca--9AWAz1zMWzkY41LybuwLkpdSvjqSNLnoQlHn3f4r0Ws02z7HgHSlWY-MRERJ4zpocaXY2JDfj4nGEin',
      'ATtYBwKUjKn7JoOyRWCnvW91ULvGzDHX-dZifS9l8gYB6HKBRr5LgH5PScgaYRSIasjp2wrfhKehxBLnublr7VcfJUUZFx65cx3ENBkxqn5Sio1QTo7dpr7JBT0l63WYtH5cg1z-4x9Z4DzAwZQfrj2rL_Ub3xnrnGEPArLlVENbSxnOnDDN',
      'ATtYBwK8Oj9TukkRT3Oa9Qh2ABNR9sS0_tNdxSyHLTlRjVlTW9ORUFRI7pPdgSDfBuU68kpRpRX4wBpJeSwqjF8KnGbGOdau5GDqRbbX5C0NNF5Wkm4eacKtFN9zCMzDHq6UFoOLAHzmAoDOfVPEbJmAPW7zQK7cB3mpvyQ6_OZIJCVkJbcc',
      'ATtYBwLdrhnDP-7CMXgm2eqqV1BJ9rwh47N71OOieNqEzbL4RZ3HujpTiFZppI5FO-wzb7Wit7odYBZcckw3JdCk9TBl47kItaDfFqTNzb1pCNI2ScdGzZDEiA4AXW-ZqKprWgYWajLHYydLKVQCBw0x7g7m_SpSZdiRP13AH_N-Ifzc3iyu',
      'ATtYBwK7i-bALQ2sV1HsDyeQtyAF84VX2PEZ2Ai3ugjmsp_1jo-SQqg5uLyyCUuTIIEe9rG7kvN5N2yglSyLLCt-Pt_uOW6mQSGXFuzvt537GHs451SLUAq0xNsXnaiU2SA8ZcxzIjdBWOFiRfLy0jdoCRlV6s2N0XC8QdU6aumUmT3g9tGt',
      'ATtYBwL9yJz5xp6Uswx2Ja2_xXmNj6kdVRHxxZX4-8kDp6Py80qM71Gz52IHaLuTWAorR5FDyAngYAavvh2W1uCeAm3UCJWW-fZ_kiKzSolUeNLu8n63AoR88Nn1U-br9m6Jy48bc40gd2_9LwNt-KrP0NHnxCua2MK-W6aEQo7wYV0k3zix',
      'ATtYBwL6AFqa2GZyR1auk6KQNbG_XAJ1m_rG9S5ZXrZSGho6UQJcEHP9y8Y1UiCOisdRQWP7P3RRlMafIFmW3XKu_WSnEnLdKq6lTNsnW0rnT9r24su0uC_dgmCeH4FumLtPznhCGwBY5oi9R9fRMu7LS44y_GGm_JqyVzd8GFGc8ZdlJelM',
    ],
  },
  {
    name: 'Chùa Trấn Quốc',
    description: 'Chùa phật',
    star: 4.4,
    numOfVote: 9483,
    distance: '7.1 m',
    hintTime: '<1 giờ',
    location: 'Đ. Thanh Niên, Yên Phụ, Tây Hồ, Hà Nội 100000, Vietnam',
    // phoneNumber: '+84 94 289 08 98',
    imageLink: [
      'ATtYBwLtC5s7MkK-WzZQo6krQnQqOsov9VMZX-Fr-fiSq8lzdUb6RROqyOgKQ8472tl3tsVrxanmrbHMNI8t4pEmNXzYlvNu0HW-n7swKCK6hwu_5RUvo1Qjb_YmsoPAcc3O8zMOy9BggB2lN6k_TdzWVI4_gIi5JWG4ZHeFyA_2mSghAQKe',
      'ATtYBwJBKaZXhehVv6xXJagKkDBtvYJ63QwXuyNm0J9QtTQFoA7hwo02Q8lbhEdkYZNM2hE4X4A-Q1ZeLV6z8JaTgNTlpkAOzaCZiNNCM0TyqbwmrRy-Rew8Fg2_Rt9VC7fP7AcTvyZd8LhE5ND-VIPyGnPXaIv1Rd6nEMxI3bDT33iTKYiD',
      'ATtYBwKO2Sg_HiYi7LGE2DvfPIhpz1KwTzXSS1szX02BHn4fIYpq7VYGVxlTJ7CjR5tjBLQOQuXya0B7ooEsz80UYcx2WdoGWtbvSI9lriYE60a6KY5eGthUNwklYkcsfAlJ2jB2kWd1fuoNnNOlRYOiRhZj3-jul2ZK6aIbZtRRwZ2oNYc6',
      'ATtYBwJJCdeKKmQghkyUlWoYzPLsZFWvWkXiieXRy-viwhnW8eqNyRbuvGwhUCDZnR5V9ugHEOMgZ36p9b7V0SzB31jJvrRqUHwFj6y6j_0G0uoL-U1unHG495q8kCty-B8FF0Nx9M6Drnxn6MDghr7kuqYIb2bGsc1f-jnQ9zty1G6OJidp',
      'ATtYBwJu38KEcFcq1ZjfKItgUut6qedEUAEjgTGHWP3bMlHC-rhEB2FIPUcc74YS5juFndJfarn2RdSDPuntdY7NgINgtGdKu5TSrRmwKdrUJNMs2_8bDqxYrELFb4xKctG4AFcDV2uVwG7gzgswUfQiyMHgI_3S-NZjmiXlVB7nUN4_95Rg',
      'ATtYBwI1Aaz9Gi60C5qunHk9uILMvF7Js8ofpQ62ZEuxS0aCZb_J9t-BUK8QVD77a_sstlpUZ5MfWVYliMUTxtAJ2f89b_C_Jid-nibB3-8c2FIjxv_u_L5c0wbyV2S5jlHIFuy-ir1toQDKEddMkVtvhu8iT-BqvEgESR4b_sVlE0rnbnwg',
      'ATtYBwJX6yMDU6kDlDNIqqrkmpMBqqCfH7VhR42HJNj5X86Kz31WmeFEfDnpwGXHMGcGUyTeAVHZfpY38UNi2_OiWhpZ3v-Df6Fzi3MjuErlpQTGyD-hHy3nR7EH5Qza8Ny-_XIWcKmrIKZ3vf6HB90tKahZTKA09jj9zkB61MPz98jmL3Mc',
      'ATtYBwJiY2EpJkNyP8JahMr3dSNp0XATYVFayzn-Jz17s2SEQGFlHb-TZpLssCgV7IXyEUD3bjcgeIXbwBA-4pd7fLG-sFA0pJesnMqfUx65HheAs2aZOiZC4tCTTtwFacR3ORDbeCZSVRihOb6bZoRco4nTHkP343thMGEFZH3-3GRDLnrR',
      'ATtYBwIQyUW-iYpRcYwmFuL4Rc6EThWJL5SnQIOUmG_voUGb6FHzUJ_9slPBi38mJhxEnq61mfLtUjc_FjV2syvKY_TCwrFFC9YM4orhnq0FYo8b0I-WMFWcPUixGlRuVRJ5sqhZvyi--jc6zjk5vpU2Dpb8j3tc19Y8Z4d96uatB2mEF0GD',
      'ATtYBwI2xwRDMttI4mbDVNH04zMF26KQKBOl8_41Lv5UOA7ZBK8hJKy2iGrJiZMgvxc8nQvTejIwaU-jU_B1wWB4uDa4V6US3sIvmR8MRCuG2b59bWruot5GUk8KzhQ6C639pW0vcxLZl6HJgntsqyDZeI3-6PIcJj3whd89jiD6viWmZ__k',
    ],
  },
  {
    name: 'Hồ Tây',
    description: 'Hồ',
    star: 4.6,
    numOfVote: 2173,
    distance: '9.3 km',
    hintTime: 'Hơn 3 giờ',
    location: 'Tây Hồ, Hanoi, Vietnam',
    // phoneNumber: '+84 98 766 60 25',
    imageLink: [
      'ATtYBwJu33G4DgTkEr75jA7I2tE9BuiMdJEDZNzU-3_NueTReALr3TJXxOGjxUKBvRoiJDBoCq5PQ_A_fp6njJZ9kTJu9LjGil-tyYJdBn7kBlgV6xsyS_DqVWP05izij8uK3xgw4IUHbylHwS8AeanErhZArXxJi012nzdVijKdSnmA_DwY',
      'ATtYBwLC3NwExV7pTUh3PH4ooeTuxzIMav1P61mxbdUXkrZaUNKbiTeC0RACDUL8eC2fELItYa0Ime_hp68J_cP5U22SridOk5cw6zSCXGZNkJOtb6XkxS5fC5JtIb0GkGIOih7APV7OD1ywoN12xNsNsfYY_kQCjrOm4Kkc6ctbezoiWtfR',
      'ATtYBwJYzqAlRY1RdrA-HojZmGnFLVAFVhI1P9-dO8yTg4SxpucR4AbZKXR5Za-M-9ZeDb8lQqVNhpZXQGYtsy50ycLunGaxNE3k35ulnt8UQHKtsxjpqdAMWMX6tYgcjs8YFL8zfAig9-mkPuFrA2cSLwIDwJG2_PpS7RvCSjGXAmioPWqo',
      'ATtYBwLzvCO4dJH0AELExdYRxk07dO35hrOgTOoB5HrsPEqV2uXo2HhQiErZvieKDUYiZN_dZvqRFs05QTUMUetUQ085q3KSos8EQDn2OMj-XLWD8snfrIJ45-YXtQI_mdIvcVuDvmf_znytPCksgypMf8c1KgN6kfv2ptzU55llOCjxV3TT',
      'ATtYBwKYrOer17fLi3gQAOWgzDzTiXDY2VOpkuxpydAHyRy9ueU2jja8MCEHDRBVgalciECy2s3j_MHIC6EuAhqbaoxl7CgSflVNhf1Fk1TgKmStq8zQ1_27Z_Io6ajeLr0AB-p1FUiUyLNkOTe5vK37uzZgwH9yi1y-MjU4zQAn3JCAPdgu',
      'ATtYBwIDPBtZURePrCTVPxBsKQsYSosjIIvGAttlq64bzSQVa8dEPwSE70Nkzje19PUvPLowWMAGlQqixPXDPvXLu9As8hlwZU49aBMd7_-z8vvpwt-Ha2rHFTNFXaZwYSKy-I9V2x5m5JxkHXaoTw3vaniU6cKNcpMLaiK1lSZhYKfT_FpX',
      'ATtYBwLb182r2fR3EFizuiBZbqbaTDUZINMFlcOxDhxV8bfbgBQ1JvphWNkLjzg7Dsp_ol8TFsgP63J0oWKyhgUpR6vZHr0JS4_eF468yS19UbCkwMclryf21xBnRULmeaCbmXnHxXFsx3mjugRWFpK0q9lfVBw8pqnvCYiaDcvxPmHZdER1',
      'ATtYBwKgmk8zpoh02Ejmri7nVFJ6g-5UzEcXXPzqmdVa4mYCViM6uhsULRzIeKwpc1IFZwWe1yfJCEKN67dfMgDR0-SMybPjYZcYVSJyXg0YnVuBFdrBVsH_3I46_wpgbHz7CoQIwqFGDZp8rpgUiLWlh4mFgbI9QvRHmnpoVRcTg6h3zDh0',
      'ATtYBwJ3cs3Ua6YzvKkPQzVjpMAOOo_kxYv3ZQZ6bqQXFkiFeBi28X-z9Y4EcDCI1RC-f8yhGk18ytKpVqkYUQHKSQUMouvVg0eESSzuDs0y--X8z3l4vqHQeB5a6gg4lP9Qr5tN73P8Raj-sejanNUePOzz0NFnLWn6WdRlDF8sZ8ViVY8g',
      'ATtYBwJNS75nVrMGlrzHhjtonbhH0uqFneagQY0HPK2XkoF1xISBV8PCOf9cTv-4khVGmfqubziIEGIVDIIzdmSMfBshu9DtuSDl6s9PfleGID3exl9MAq2W9rcxf_X9D1DShpeSWdFZZXIFruRHGHc9LVPN58B6VoPrPQCPy68d19D_jG6a',
    ],
  },
  {
    name: 'Nhà hát lớn Hà Nội',
    description: 'Nhà hát Opera',
    star: 4.6,
    numOfVote: 12650,
    distance: '1.4 km',
    hintTime: '<1 giờ',
    location:
      '01 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội 100000, Vietnam',
    phoneNumber: '+842439330113',
    imageLink: [
      'ATtYBwLKkY6sYEeMtrp-cY5jLl93U9nDIReCopTG1MTZdrvB8gHMCHyAEPpIAVfHUU9Ct_DPiVt1DuRNyPgN0J9NT_szb69F83hMZ8eK984VL8BkRoOQrMeZ-8kTKT3vLkvuyJzpWrGIy8AM2A9ICV-IK6d2VAmjaA1DGVtGamHDo0FBcOM5',
      'ATtYBwKwCXxYcsQfmrFG0SSM6lkGTLPFfDTfjT4Xs3klLsYcUYEB1IDBtCw4DId9hvG8jYTTUjwKWMEoQTi55fy0YagJIOAHZk1yKeJeVjrLLg8cs875SDj_W1ToXmqeWDVhVtQpp199z4cDNOBIqAShNOCVyo2S3ujMdPCLxaOh45Q8m0Mr',
      'ATtYBwKz9cSqcLi4Jyzd3b-xgkotFateZnTkf88eFGvMLhJVj0bsU41eEVl0g30rNZI1owm0Gbi6P36WLyzxkoN828tX1NMuxeNiCBMch2SUjEJBN0AhoR9iSw528f-EYk3RDApg_bddrVQZSUbGTwaeu2CQ4Ett9AAn98gI6pGzz7o67Ofp',
      'ATtYBwJbvWpg77QG5oW93pZKHoBuWNFVow4bIYUcwP26cvlpBQFnv5ZtleuTtMrtfZ-fDfmbYzkP-LtYfQ7kQXxAXSyPmF2hZ9bDNo7u4vvM27Q06_iat6Xa2GbJ1ByPdRrWN7j7BLyn9fD-j8fLoXC420XNUg967WF9ZzhrWPcKIUhTjYlF',
      'ATtYBwILC9Cf-TygpUkyvmzbgd7ChCoLEqvk_lUJIWXalQsXpV-H39zfSoIMegGPG5AAFTuUmX_SJds03vzrb-_vWKon8u0jABOWhLZ7lFov9ELd9fj-q0VrxFc9XhkHi5mWi0X82WLqHmepkBjeEuZEa3Wurf0HegpRToNc62256AkhslbS',
      'ATtYBwJ5YJNtWboTeH-K567CASk3ib8XAcw9nUHWHMt3pc-CqOj92tkEsOFDqjPB2-ZjT9bprTHmU9QzwwUfRCxnK6fhacMgwrU9h_d4XX7x3s9a-PFP17P2vaRvOL16TH6vAQcKAv_6anvjIbshRWIG7J64B_grMXDEJ3x_rBMMzH1TBtrk',
      'ATtYBwJi7L07CRwaa1kuw16UymUmn6rOV5RsoQMcu-uw87mj2S8sRfE-W6lOluEtZycOjSw98EEd_ES2X6stKYb3aHxmbh0JJmo3_HB1AdUtpKJAiVC46L6B5jGcoSyiVBWcN0sZX0IkrZOrsBH8uXhMSEkm-qFVXojHas_QqqGoMHIPcm2-',
      'ATtYBwLdFf2d44qw2hzimgVRrYbI0RA7Gt9BbFEgG19OwlaGye5O6aAb9EWtHVuRdlO1NRNF42ElZ50nXosrSO5zxvLi25wbKgybAM73QFZeCMcKi8e1EhyBxY16q4zX50VtqhzMUBfMtEh0eQCt8nlpFo8h2V8E8h0d_Ha7Q1_tVu9leQ4c',
      'ATtYBwLifQYdmPvqFVASYZ6XSU9mRovGb_UuPyDsEE_A2sIULT2nENcpnZ3LcA_Rj0cTDkcEE95ZxwPQDGvh8y-kJ3Cy6SIWPi5UOYnB9nULxk93FltncfZKs1UnH_wOhKcO9m4IfNrAu1GYS9sipY8ytGqxu6nMWeeDwoHcd0VWRGJNzYm7',
      'ATtYBwJdIxMPA-RwHJYhZf-q3UPAMHpGOT6JkhCbuM9yDeAnom-qkm4Do0rUN-PECLyXNns-ViBNfREMcKm7DXbshuNLP8zt6_XmdJsFaEPQDj4o8dvvOdiAyGaogcAq7SlLVXi5ktLTpkXOwdNMZErvDGWJYYkN0g8dlvzj_npCixE3XElK',
    ],
  },
  {
    name: 'Hoàng thành Thăng Long',
    description:
      'Khu phức hợp hoàng thành với các tòa nhà & tác phẩm điêu khắc từ thế kỷ 11, bao gồm tháp và rồng đá.',
    star: 4.3,
    numOfVote: 9665,
    distance: '4.9 km',
    hintTime: '1-2 giờ',
    location: '19C Hoàng Diệu, Điện Bàn, Ba Đình, Hà Nội 100000, Vietnam',
    phoneNumber: '+842437345427',
    imageLink: [
      'ATtYBwLFd59p25K-EdT5x0x93n-q9Am9-RPzaX4jS3MSEAcyukwFqOzomzFQFeA858WZK5f8GLQeAmlAvYSLMJpCpBxkgykZZKrDoAe8wyCabyd8NgKyKta7jikD1YX3TuV6Za5yhr9MZUvfN2R7kXhPhrPW1tasucFxqT8NIcUe8Slz1Pkq',
      'ATtYBwJORMwOpNyjl8SytYaSAB8LrJ3w7ATlM_Cb1vCM8eGoP2kwkaPnpQO1Fr9Aw4iI9ytZykEtw7fO5O6GuAziq8nIjF4InrB1QWjDTlw5nHnQn6i6GS54Ruy6SElolD8M2iZmeWZXPGd4VCO2A_jo-v2t-4BFSNT6Y_t6OrZHAGGIKjMs',
      'ATtYBwLJZEnqyCSqFSKYhI0m4Fuczz3P1xi2444G286SFwqKkHhOhBtvH7kj71EM2bkIscpRZyaqW9g7Kd0Fmz1_7h3Due7aH37XamuB3rs8EiYjb5p-5G2vH78OGOBdFiyT-74HGroZcA98dgAb5jI_NRaoSf7uHHQG5Kf4Nf0qZRAA-npQ',
      'ATtYBwIYF2iHs4e9Kn__4skoTsDDCWKEs1sy49fVEkzkl7jtz2Cca5jJt0ugKOTCxAsYXL7NBzrw84d5ssINebHqqX1eeJ6Em8MJlwmjtEdcsrzXs1CN6H-RbtfAtk5V74zXCIgxjI7ORc6REu-wq_PJKtqF2xcHWtXCJo66W8M2FUsSWj6N',
      'ATtYBwJ3leP2dVTSTW7_yzZDAhVmc8KsxSyxclwe3SocU3-_lg_iZJhUPRWgP871_gAutpT_KWpCSgxt5REYUF-LAKdZPYSoU9otrUo72uF7tB1E3VG6IqmYedO_T07b3vW6_651sgwKApAfwlj6OFqZx-82Elh3YsLJR4RuDMoW5HK_klFB',
      'ATtYBwIt0nuHn4xS3sit26qr3TIl11MkvKVpoToQForNJwhfjZkO5q6svBhctvPQiXK1Ohr8yqsPjjoyVMDJj_1L8o8Kh7mYYBTr75FL1u_EpMRwcwrz7tDy_ot6p7uGLO16iGQG7tEmWj7MW4JSScIA_ZIYPEKVs4QfCZO440tpQ35g1vaT',
      'ATtYBwLoash6pr-k-Qy8YyL2hA8GB_OQbPULwoWwpK2QHRc9acQR-8iDE0tZiAizffrcROiBHm2Xd_pkbyj_TJPYd7kofGJk_VlhM3c83giuRxEh8Bdz3OuVCxrud9kFphMWzAML5K4RymG6f3cfpZNE6obsc8sk71n6teAC_kW8KgAtmI5R',
      'ATtYBwJvKmGvZ87lokKEknexa3wMmfmRxfSZ5OaNpJJJ2mzpB9v9lbuUXcWoQ6jCVm2bbsP4ArBoS3dzVRReKXG9ldAPKcfQo5Tbsogp4YBzFzTv9pOylhNElCqghNSH_rCXOSAdCx7-nwIWu_os6_Gxwu9vf3sLyPO-xqJtpZV457WSQp0',
      'ATtYBwLqPsmuw4yBvAkrGKpLsd8Yu-sO-cEEIxXvN8WSDa42F9GpxEiXGcEWw-bizViMBBbiM-VIOsc2ftVMjDPWoWUwjvWPqru544K54jKOfS9Nl90vLxsiftTn-8JlSjAIj07QC2Yv2crV-Kf_17UVVk7WTUHL9eEtEOOGsaLs1BjUJ3Rl',
      'ATtYBwJF6jkhg-y4E8-uUYeZlGujdg_bY6asbpk7qP0soDTZiX9wS4bq2zjU30RVIeIijFsG3x9G0Lo6B-S6hwbCcZXpvng_JeOTBNRvqQWNHQhBtRV4TlUy-_Ye8eRglTZS_l6JU54k_YyXCJMnDh8oeTBV3oVGx5VMjatY4Y4voaAMYMGq',
    ],
  },
  {
    name: 'Nhà tù Hỏa Lò',
    description: 'Di Tích Lịch Sử Nhà Tù Hỏa Lò',
    star: 4.3,
    numOfVote: 7822,
    distance: '3.4 km',
    // hintTime: 'Hơn 3 giờ',
    location: '1 Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam',
    phoneNumber: '+842439342253',
    imageLink: [
      'ATtYBwJwK7SWs_On5Gzcq4oL259BexW81T8sjoUJUR-TFeDcwZy4tmUgo36FOBCoSS6ESamk7RFzf-YBCTQotvVcLZexVZVjrNUzTG6_oJ2PnEe1aCLwxqeTqlPjvwloQI-Gb6w_FOQcx2Pt-WZkxbBlZ-abMUp7L-v8ywCDGHxXgieiizFp',
      'ATtYBwIyN6LTEqVxC4Cta46qpQ-O69RER35lIXNuPrWmS5RSikSN8-ZplIJVpPpbkc6DnsIQX--VJMjX0_xRl1TrhVXsrBmLEfxgXltvMr1Y-RuuJClxWK7jR5txC1yzU_1TfTiunTEAfhDS6wtdLgT74Lh2VcgXcb4mckvtCdm8FmCV4Wjr',
      'ATtYBwJzSStmWIomkm59nvyA7y32475DoQA1puna4enjTlyXjam9VYKUh1IHdCNxFlMfK_DvCVlkOYjBFgQr8dqyXXUaS5m-ZxqnOMwa7VPC2jOH1RmpovJxymI8QhMb4ACJHoVJ8m1sMISfYoFpyRvxz_Dx-RxQGmbhQk6F_SwX5Ihwt-o5',
      'ATtYBwKSPkHN4bXn4v5YUrem_bYr8GnFydPe8TrjBqbaI7xXqFn9WXnYy12sYSLdUcd-paihI_33GFB9jBh8Hl3SJhmsPZouhLg8NEH-MK6NJz0xPLtKzUFmyADAUV2i_jN6CRShQgtEWJlsMbFT3pcP9jU8qd9j8C3VFoZ8cxpkqr35c__z',
      'ATtYBwJRKTIbJ6roJc3p8AgTbUsPYWh4m_qZvlyyDYxna3AGk7SUSxb69dfZ5rprcdg1kZYznWZfdGNy8pCy5bUIMewK7LNIMSdC2gEJe3CxyikOnIwsnx4uD6LlvzSp8BZUeO-ki3BuDKHJOL5miXWE5gPmjHkR9huah99KGg46eh1RxUau',
      'ATtYBwL4rW1y3MDz_Ztr5VNpBrr0IWP7zOJXUS3LqIIIoJTuKWsCyRPz0xwml7HQVI3iMCAKxpQhjbYvrl42rFWgDTNMqbEqn4xodJ99kaG2VxBUZF121Io-3d0o4ZiGgZ99zfSLoqocPgfo5tjSgNkpD_55BqmYaK-1E8TUAK76FOic5mDX',
      'ATtYBwKBvTftah8L8UTnLtRejaF2EosXktwPREIg1h3jqZvTOGS87NgyG-B-fj646u3AdVnrCgVP2XRd1H8Cyy0zimistXyokqaHBloa4FW9MHgA_UeWlnKkPLL4S2-8WA5GcRD2MzsGGI1uyZrO7ODZkVaAYW4Zd2WkSQl2-jtAugBcsSeQ',
      'ATtYBwKexgip6XWXkGBw0awmP2hJvYvwM3Tgp7EyyqJFB1szr68Djfph6xDlRGadmEcUsXxSoGIm3KvRDHhRl2NGBJwqnD8XwyCU1lGduh3xi-3KfmzSZ-EpXoRYo64GjoioYqYQREIeb28bHSPUNZkDrGNWFRMja0A-_sIIZqXNBB4NmhU6',
      'ATtYBwJ-37n854LUBoH-zFoL9X1YzzbdpH6vSr_NmeNif_sjot7Z4-2cusz1gifcd25k155Kfofz-wl3b6wf7Ud_mplNoUVqKa6KHV6Nell7j05laZBC-yKaPs18FYKWhJop3BsynS4jSNN4GXDb5262l-y3ziWQqay_bGQBTVMd4rNMF1wL',
      'ATtYBwIIxkyMGPcVNhRHmtcZRu4mPYB_F9oBcHaOrtz2-dkqII0pncVCEHR8cAL05Yh2Qq08mB6l8Nj3mtnPTcLaW_ici85eyDdx0v10MrF-zDd-Vm0AJSsrrIsiZuvAw54tt9i1LtL8iKirdGtQhzdmaee4CklDUB9lePZ7cOfdYC-4A7z0',
    ],
  },
];

const Home = ({navigation}) => {
  const onPressDestination = (info) => {
    navigation.navigate(NAVIGATE_TO_HOME_DETAIL, {destinationInfo: info});
  };

  const renderFirstSuggestionItem = ({item, index}) => {
    let itemUri =
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
      item.imageLink[0] +
      '&key=AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';

    return (
      <TouchableOpacity
        style={[
          homeStyles.firstSuggestionItemView,
          index === 0 ? {marginLeft: 0} : {marginLeft: 10},
        ]}
        onPress={() => onPressDestination(item)}>
        <Image
          style={homeStyles.firstSuggestionItemImage}
          source={{uri: itemUri}}
        />
        <Text style={homeStyles.itemName}>{item.name}</Text>
        <StarRating
          disabled={true}
          containerStyle={homeStyles.starContainer}
          starStyle={homeStyles.star}
          buttonStyle={homeStyles.starStyles}
          starSize={15}
          maxStars={5}
          rating={item.star}
        />
        <Text style={homeStyles.extraInfo}>{item.numOfVote + ' đánh giá'}</Text>
        <Text style={homeStyles.extraInfo}>{item.distance}</Text>
      </TouchableOpacity>
    );
  };

  const renderFirstSuggestion = () => {
    return (
      <View style={homeStyles.firstSuggestionView}>
        <Text style={homeStyles.firstSuggestionText}>Tour du lịch gần đây</Text>
        <FlatList
          style={{flexGrow: 0}}
          data={fakeData}
          horizontal={true}
          renderItem={renderFirstSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const renderSecondSuggestion = () => {
    return (
      <View style={homeStyles.firstSuggestionView}>
        <Text style={homeStyles.firstSuggestionText}>Các địa điểm du lịch</Text>
        <FlatList
          style={{flexGrow: 0}}
          data={secondFakeData}
          horizontal={true}
          renderItem={renderFirstSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const renderHeaderView = () => {
    return (
      <View style={homeStyles.headerView}>
        <Image style={homeStyles.exploreImage} source={IMG.exploreImage} />
        <Text style={homeStyles.exploreText}>
          Khám phá các địa điểm gần đây
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={homeStyles.screenView}>
        {renderHeaderView()}
        {renderFirstSuggestion()}
        {renderSecondSuggestion()}
      </View>
    </ScrollView>
  );
};
export default Home;
