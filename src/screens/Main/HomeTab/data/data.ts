import Camera360Icon from '../../../../assets/icon/ic_360_camera';
import AirbagIcon from '../../../../assets/icon/ic_airbag';
import BackCameraIcon from '../../../../assets/icon/ic_backCar';
import BackupTireIcon from '../../../../assets/icon/ic_backup_tire';
import BluetoothIcon from '../../../../assets/icon/ic_bluetooth';
import CarScreenIcon from '../../../../assets/icon/ic_car_display';
import CollisionSensorIcon from '../../../../assets/icon/ic_collision_sensor';
import DashCamIcon from '../../../../assets/icon/ic_dashcam';
import ETCIcon from '../../../../assets/icon/ic_etc';
import GPSIcon from '../../../../assets/icon/ic_gps';
import MapIcon from '../../../../assets/icon/ic_map';
import SpeedWarningIcon from '../../../../assets/icon/ic_speed_warning';
import SunRoofIcon from '../../../../assets/icon/ic_sunroof';
import TireSensorIcon from '../../../../assets/icon/ic_tire_sensor';
import UsbIcon from '../../../../assets/icon/ic_usb';
import {AmenitiesIconMapping} from '../../../../types';

export const promotionData = [
  {
    id: 1,
    image:
      'https://vinfast-auto-vn.net/wp-content/uploads/2021/10/bang-gia-xe-o-to-vinfast.jpg',
  },
  {
    id: 2,
    image:
      'https://khuyenmaimitsu.com/domains/khuyenmaimitsu.com/files/KM%20THANG%2010/km_t10_optimized.jpg',
  },
  {
    id: 3,
    image:
      'https://xevietanh.com/userfiles/images/thue-xe-du-lich-cao-cap-2.jpg',
  },
  {
    id: 4,
    image:
      'https://hyundaibinhthuan.vn/wp-content/uploads/2020/07/Banner-1200x628-V2.jpg',
  },
  {
    id: 5,
    image:
      'https://vinfastotomiennam.com/uploads/details/2021/07/images/162192596_1459086867775421_8609258786462168109_n.jpg',
  },
];

export const carData = [
  {
    id: 1,
    title: 'Honda Camry 2018',
    image:
      'https://tuvanmuaxe.vn/upload/upload_img/images/Toyota-Camry-2018-gia-xe-tuvanmuaxe-4.jpg',
    location: 'Quận 4, TP HCM',
    type: 'Số tự động',
    price: 1200000,
    rating: 4.5,
    totalRide: 15,
  },
  {
    id: 2,
    title: 'Honda Civic 2022',
    image:
      'https://files01.danhgiaxe.com/sxqARZyGxqt_BQww8HR0ig43TX4=/fit-in/1280x0/20220330/danhgiaxe.com-honda-civic-2022-21-023945.jpg',
    location: 'Quận 7, TP HCM',
    benefit: 'Giao xe tận nơi',
    type: 'Số tự động',
    price: 1234567,
    rating: 4.5,
    totalRide: 15,
  },
  {
    id: 3,
    title: 'Vinfast Lux SA 2.0 2021',
    image:
      'https://i2-vnexpress.vnecdn.net/2021/09/18/lux-sa2-1564361912.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=Dtfts1hv96Am8dJXVuqe7Q&t=image',
    location: 'Quận 1, TP HCM',
    type: 'Số tự động',
    originalPrice: 1234567,
    price: 870000,
    rating: 4.5,
    totalRide: 15,
  },
];

export const featuredLocationData = [
  {
    id: 1,
    title: 'Sài Gòn',
    image:
      'https://statics.vinpearl.com/dac-san-sai-gon-lam-qua-0_1624720587.jpg',
    totalCar: 3250,
  },
  {
    id: 2,
    title: 'Hà Nội',
    image: 'https://ehgtravel.com/wp-content/uploads/2018/04/hn01.jpg',
    totalCar: 1432,
  },
  {
    id: 3,
    title: 'Đà Nẵng',
    image:
      'https://besthuecitytour.com/wp-content/uploads/2020/09/Things-To-Do-In-Da-Nang-Best-Hue-City-Tour-Travel-1.jpg',
    totalCar: 865,
  },
  {
    id: 4,
    title: 'Nha Trang',
    image:
      'http://2.bp.blogspot.com/-RtdRxLjbXyI/UmC4h1obXXI/AAAAAAAABMs/xSatQKeqhfo/s1600/vietnam+travel+-+nha+trang+3.jpg',
    totalCar: 721,
  },
  {
    id: 5,
    title: 'Hải Phòng',
    image:
      'http://vemaybayphonglantourist.com/upload/news/hp-01-1492068307-3027.jpg',
    totalCar: 598,
  },
];

export const AirportData = [
  {
    id: 2,
    title: 'Nội Bài',
    image:
      'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/07/san-bay-noi-bai1.jpg',
    totalCar: 1432,
  },
  {
    id: 3,
    title: 'Đà Nẵng',
    image:
      'https://media.doisongphapluat.com/thumb_x600x600/2018/09/29/san_bay_da_nang_nguoi_dua_tin.jpg',
    totalCar: 865,
  },
  {
    id: 4,
    title: 'Nha Trang',
    image: 'https://i.imgur.com/KZsmUi2l.jpg',
    totalCar: 721,
  },
  {
    id: 5,
    title: 'Hải Phòng',
    image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    totalCar: 598,
  },
];

export const benefitData = [
  {
    id: 1,
    image: require('../../../../assets/image/benefit1.jpg'),
  },
  {
    id: 2,
    image: require('../../../../assets/image/benefit2.jpg'),
  },
  {
    id: 3,
    image: require('../../../../assets/image/benefit3.jpg'),
  },
  {
    id: 4,
    image: require('../../../../assets/image/benefit4.jpg'),
  },
];

export const carDetailData = [
  {
    id: 1,
    title: 'Honda Camry 2018',
    images: [
      'https://tuvanmuaxe.vn/upload/upload_img/images/Toyota-Camry-2018-gia-xe-tuvanmuaxe-4.jpg',
      'https://danchoioto.vn/wp-content/uploads/2019/01/duoi-xe-Toyota-Camry-2018-co-nhieu-net-duoc-tram-khac-cau-ky1.jpg.webp',
      'https://danchoioto.vn/wp-content/uploads/2019/01/toyota-camry-2018-co-noi-that-hien-dai-va-la-mat1.jpg.webp',
      'https://danchoioto.vn/wp-content/uploads/2019/01/Toyota-Camry-2018-co-he-thong-thong-tin-giai-tri-Entune-3.0-hoan-toan-moi1.jpg.webp',
    ],
    location: 'Quận 4, TP HCM',
    type: 'Số tự động',
    price: 1200000,
    licensePlate: '51A-12345',
    rating: [
      {
        ratingByUserId: 1,
        username: 'Thắng Nguyễn',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Chủ xe thân thiện, vui vẻ',
      },
      {
        ratingByUserId: 2,
        username: 'Tùng Lê',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 4,
      },
      {
        ratingByUserId: 3,
        username: 'Biên Hải Trần',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Xe lái cảm giác vui vẻm êm mượt',
      },
      {
        ratingByUserId: 4,
        username: 'Thanh Tú',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 3,
      },
      {
        ratingByUserId: 5,
        username: 'Chí Trung',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
      },
    ],
    totalRide: 15,
    features: [
      {'Truyền động': 'Số tự động'},
      {'Số ghế': '7 chỗ'},
      {'Nhiên liệu': 'Xăng'},
      {'Tiêu hao': '71/100km'},
    ],
    description: '',
    owner: {
      name: 'Đặng Thanh Bình',
      avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
      totalRide: 15,
      rating: 5,
      description:
        'Chủ xe 5* có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao và dịch vụ nhân được nhiều đánh giá tốt từ khác hàng',
      responseRate: '100%',
      acceptRate: '80%',
      responseIn: 5,
    },
  },
  {
    id: 2,
    title: 'Honda Civic 2022',
    images: [
      'https://files01.danhgiaxe.com/sxqARZyGxqt_BQww8HR0ig43TX4=/fit-in/1280x0/20220330/danhgiaxe.com-honda-civic-2022-21-023945.jpg',
      'https://images2.thanhnien.vn/Uploaded/chicuong/2022_03_14/honda-civic-e-1-9455.jpg',
      'https://images2.thanhnien.vn/Uploaded/chicuong/2022_03_14/honda-civic-e-4-1639.jpg',
      'https://images2.thanhnien.vn/Uploaded/chicuong/2022_03_14/honda-civic-e-5-3375.jpg',
    ],
    location: 'Quận 7, TP HCM',
    benefit: 'Giao xe tận nơi',
    type: 'Số tự động',
    price: 1234567,
    licensePlate: '51A-23456',
    rating: [
      {
        ratingByUserId: 1,
        username: 'Thắng Nguyễn',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Chủ xe thân thiện, vui vẻ',
      },
      {
        ratingByUserId: 2,
        username: 'Tùng Lê',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 4,
      },
      {
        ratingByUserId: 3,
        username: 'Biên Hải Trần',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Xe lái cảm giác vui vẻm êm mượt',
      },
      {
        ratingByUserId: 4,
        username: 'Thanh Tú',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 3,
      },
      {
        ratingByUserId: 5,
        username: 'Chí Trung',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
      },
    ],
    totalRide: 15,
    features: [
      {'Truyền động': 'Số tự động'},
      {'Số ghế': '7 chỗ'},
      {'Nhiên liệu': 'Xăng'},
      {'Tiêu hao': '71/100km'},
    ],
    amenities: [
      'map',
      'back-camera',
      'speed-warning',
      'usb',
      'etc',
      'bluetooth',
      'dash-cam',
      'tire-sensor',
      'sunroof',
      'backup-tire',
      'airbag',
    ],
    description:
      'Xe Honda Civic đời 2022 máy dầu xe trang bị Android Box, lót gỗ sang trọng, cảnh báo tốc độ, camera hành trình, xe bảo dưỡng hãng định kỳ',
    owner: {
      name: 'Đặng Lộc',
      avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
      totalRide: 15,
      rating: 5,
      description:
        'Chủ xe 5* có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao và dịch vụ nhân được nhiều đánh giá tốt từ khác hàng',
      responseRate: '100%',
      acceptRate: '80%',
      responseIn: 5,
    },
  },
  {
    id: 3,
    title: 'Vinfast Lux SA 2.0 2021',
    images: [
      'https://i2-vnexpress.vnecdn.net/2021/09/18/lux-sa2-1564361912.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=Dtfts1hv96Am8dJXVuqe7Q&t=image',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-5891-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-6273-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-3217-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-5090-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-9594-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-1116-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-8701-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-5939-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-2165-1666259159.jpg',
      'https://i-vnexpress.vnecdn.net/2022/10/20/-6071-1666259159.jpg',
    ],
    location: 'Quận 4, TP HCM',
    type: 'Số tự động',
    originalPrice: 1234567,
    price: 870000,
    licensePlate: '51A-34567',
    rating: [
      {
        ratingByUserId: 1,
        username: 'Thắng Nguyễn',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Chủ xe thân thiện, vui vẻ',
      },
      {
        ratingByUserId: 2,
        username: 'Tùng Lê',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 4,
      },
      {
        ratingByUserId: 3,
        username: 'Biên Hải Trần',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
        description: 'Xe lái cảm giác vui vẻ êm mượt',
      },
      {
        ratingByUserId: 4,
        username: 'Thanh Tú',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 3,
      },
      {
        ratingByUserId: 5,
        username: 'Chí Trung',
        avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
        date: '2023-10-20',
        rating: 5,
      },
    ],
    totalRide: 15,
    features: [
      {'Truyền động': 'Số tự động'},
      {'Số ghế': '7 chỗ'},
      {'Nhiên liệu': 'Xăng'},
      {'Tiêu hao': '81/100km'},
    ],
    amenities: [
      'map',
      '360-camera',
      'dash-cam',
      'tire-sensor',
      'speed-warning',
      'gps',
      'backup-tire',
      'etc',
      'bluetooth',
      'back-camera',
      'collision-sensor',
      'sunroof',
      'usb',
      'dvd-screen',
      'airbag',
    ],
    description: '',
    owner: {
      name: 'Linh Car',
      avatar: 'https://i.imgur.com/2nCt3Sbl.jpg',
      totalRide: 15,
      rating: 5,
      description:
        'Chủ xe 5* có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao và dịch vụ nhân được nhiều đánh giá tốt từ khác hàng',
      responseRate: '100%',
      acceptRate: '80%',
      responseIn: 5,
    },
  },
];

export const FeeData = [
  {
    fee_name: 'Phí vượt giới hạn',
    fee_amount: '5 000đ/km',
    fee_description:
      'Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 400km khi thuê xe 1 ngày',
  },
  {
    fee_name: 'Phí quá giờ',
    fee_amount: '70 000đ/giờ',
    fee_description:
      'Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 giờ, phụ phí thêm 1 ngày thuê',
  },
  {
    fee_name: 'Phí vệ sinh',
    fee_amount: '80 000đ',
    fee_description:
      'Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiêu vêt bẩn, bùn cát, sinh lây ...)',
  },
  {
    fee_name: 'Phí khử mùi',
    fee_amount: '200 000đ',
    fee_description:
      'Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)',
  },
];

export const otherRules = [
  'Sử dụng xe đúng mục đích.',
  'Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.',
  'Không sử dụng xe thuê để cầm cố, thế chấp.',
  'Không hút thuốc, nhả kẹo cao su, xả rác trong xe.',
  'Không chở hàng quốc cấm dễ cháy nổ.',
];
export const otherRulesFull = [
  ...otherRules,
  'Không chở hoa quả, thực phẩm nặng mùi trong xe.',
  'Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.',
];

export const amenitiesIconMapping: AmenitiesIconMapping = {
  map: {name: 'Bản đồ', icon: MapIcon},
  bluetooth: {name: 'Bluetooth', icon: BluetoothIcon},
  'dash-cam': {name: 'Camera hành trình', icon: DashCamIcon},
  usb: {name: 'Khe cắm USB', icon: UsbIcon},
  'dvd-screen': {name: 'Màn hình DVD', icon: CarScreenIcon},
  'back-camera': {name: 'Camera lùi', icon: BackCameraIcon},
  '360-camera': {name: 'Camera 360', icon: Camera360Icon},
  'backup-tire': {name: 'Lốp dự phòng', icon: BackupTireIcon},
  'tire-sensor': {name: 'Cảm biến lốp', icon: TireSensorIcon},
  'speed-warning': {name: 'Cảnh báo tốc độ', icon: SpeedWarningIcon},
  gps: {name: 'Định vị GPS', icon: GPSIcon},
  etc: {name: 'ETC', icon: ETCIcon},
  'collision-sensor': {name: 'Cảm biến va chạm', icon: CollisionSensorIcon},
  sunroof: {name: 'Cửa sổ trời', icon: SunRoofIcon},
  airbag: {name: 'Túi khí an toàn', icon: AirbagIcon},
};
