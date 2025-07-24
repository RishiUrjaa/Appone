import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, requestMultipart} from './ApiSauce';
// import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoder';
import {Dimensions} from 'react-native';
import {latitudeDelta} from '../service/Config';
import {SOCKET_URL_2} from './Config';
// const request = (path, json) => {
//   return new Promise((resolve, reject) => {
//     ApiSauce.post(path, json).then((response) => {
//       if (response.ok) {
//         resolve(response.data);
//       } else {
//         console.log(response.err);
//         reject(response.err);
//       }
//     });
//   });
// };

export const SignInApi = json => request('signin_astrologer', json);
export const SignUpApi = json => request('Signup_astrologer', json);
export const OtpApi = json => request('otp_send_astrologer', json);
export const StatusApi = json => request('change_status_consultations', json);
export const DeleteNotification = json =>
  request('delete_astrologer_notification', json);
export const AstroOnlineStatusApi = json =>
  request('astrologer_online_offline', json);
export const GiftList = json => request('send_gifts', json);
export const EarningApi = json => request('astrologers_earning', json);
export const AstrologerRegis = json => request('astrologer_regestrion', json);
export const HomeApi = json => request('home_astrologers', json);
export const EndBrodcastApi = json =>
  request(SOCKET_URL_2 + 'end_broadcast ', json);
export const CreatBroadcastApi = json =>
  request(SOCKET_URL_2 + 'create_broadcast', json);
export const NotificationApi = json =>
  request('list_astrologer_notification', json);
export const Birth = json => request('astrologer_user_booking', json);
export const DynamicApi = json => request('astrologers_dynamic', json);
export const AcceptRejectApi = json => request('accept_reject_request', json);
export const UpdateBankDetail = json => request('update_bank_details', json);
export const BankDetail2 = json => request('astrologer_bank_details', json);
export const AcceptRejectApi1 = json =>
  request('accept_reject_request_new', json);
export const HoroscopeHistoryApi = json => request('horoscope_history', json);
export const ForgotPasswordApi = json =>
  request('astrologer_forget_password_otp', json);
export const FetchVideo = json => request('astrologer_video_history', json);
export const ResetPasswordApi = json =>
  request('change_password_astrologer', json);
export const GetProfileApi = json => request('get_profile_astrologers', json);
export const MobileLogin = json => request('otp_send_astrologer', json);
export const OtpVerify = json => request('verify_otp_astrologer', json);

export const DeleteAstrologer = json => request('delete_astrologer', json);

export const CheckStatusApi = json => request('check_all_steps', json);
export const UpdateProfileApi = json =>
  request('update_superviser_profile', json);
// export const MobileLogin = json => request('astrologer_send_otp', json);
export const VerifyLogin = json => request('change_mobile_astrologer', json);
export const UpdateProfessionalDetailsApi = json =>
  request('update_professional_details', json);
export const MasterSpecializationApi = json =>
  request('master_specialization', json);
export const MasterEducationDegreeApi = json =>
  request('master_education_degree', json);
export const LanguageCategoriesApi = json =>
  request('language_categories', json);
export const MasterCityApi = json => request('master_city', json);
export const AttachListApi = json => request('list_upload_horoscope', json);

export const AttachRemoveApi = json => request('delete_images_horoscope', json);
export const AttachCompleteApi = json => request('complete_horoscope', json);
export const CallHistoryApi = json => request('call_history', json);
export const CallHistoryApia = json => request('astrologer_live_history', json);
//get_astrologer_prices
export const Price = json => request('set_astrologer_discount', json);
export const ChatHistoryApi = json => request('astrologer_chat_history', json);
export const VideoHistoryApi = json => request('video_history', json);
export const CanBookingStart = json => request('can_booking_start', json);
export const PoojaHistoryApi = json => request('puja_booking_history', json);
export const PoojaCouponApi = json => request('puja_list_for_coupan', json);
export const OtherApi = path => request(path, {}); //
export const CouponApi = json =>
  request('create_astrologer_coupans_for_user', json);
export const CancelAstrologerBookingsApi = json =>
  request('cancel_astrologer_bookings', json);
export const PremiumAstrologerApi = json =>
  request('my_schedule_bookings', json); //
export const Unread = json => request('total_unread_reports', json); //

export const PendingLit = json => request('fetch_queue_users', json);
export const UpdatePrice = json => request('update_astrologer_price', json);
export const AddSuport = json => request('add_support_astrologer', json);
// multipart
export const AttachUploadApi = json =>
  requestMultipart('image_attchment_upload_horoscope', json);
export const AsyncStorageSetUserId = id => AsyncStorage.setItem('user_id', id);
export const AsyncStorageGetUserId = () => AsyncStorage.getItem('user_id');

export const AsyncStorageClear = () => AsyncStorage.clear();

export const AspectRatio = () =>
  Dimensions.get('window').width / Dimensions.get('window').height;
export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;
export const LongitudeDelta = () =>
  (latitudeDelta * Dimensions.get('window').width) /
  Dimensions.get('window').height;
export const LatitudeDelta = latitudeDelta;

export const formatAmount = amount =>
  `\u20B9 ${parseInt(amount)
    .toFixed(0)
    .replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`;

export const formatNumber = str => str.replace(/,/g, '').replace('\u20B9 ', '');

export const textInPrice = price => `\u20B9 ${price}`;

export const timeFormate_mmss = time => {
  let mm = Math.floor(time / 60);
  let ss = time % 60;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;
  return `${mm}:${ss}`;
};
