import { APP_NAME } from './../constants/index';
import { VERIFY_CODE_EXP } from './../constants/validation';

export const forgotPasswordViLang = (code: string) => `
<div style='max-width: 776px; margin: 0 auto; background-color: #fff; padding: 12px'>
  <h2 style='text-transform: capitalize; color: #11254b; font-size: 22px'>${APP_NAME} kính chào !</h2>

  <p style='font-size: 18px; color: #777;'>
    Bạn quên mật khẩu, đừng quá lo lắng ! Chúng tôi sẽ giúp bạn lấy lại một mật khẩu mới trong ít phút. <br>
    Nếu bạn không thực hiện yêu cầu trên, hãy bỏ qua Email này. Hoặc liên hệ chúng tôi để nếu cảm thấy lo lắng.
  </p>

  <div style='text-align: center; margin: 24px 0; background-color: rgba(33,158,188, 0.2); padding: 8px; font-size: 24px; color: #333; font-weight: 600'>${code}</div>

  <p style='font-size: 18px; color: #f73131;'>Chú ý: Mã xác thực chỉ có hiệu lực trong ${VERIFY_CODE_EXP} phút. Xin vui lòng không gửi mã này cho bất kỳ ai.</p>

  <p style='font-size: 18px; color: #777;'>Trân trọng cảm ơn,<br>${APP_NAME} Team</p>
</div>`;

export const forgotPasswordEnLang = (code: string) => `
<div style='max-width: 776px; margin: 0 auto; background-color: #fff; padding: 12px'>
  <h2 style='text-transform: capitalize; color: #11254b; font-size: 22px'>${APP_NAME} hello!</h2>

  <p style='font-size: 18px; color: #777;'>
    You forgot your password, don't worry! We'll help you get a new password back in a few minutes. <br>
    If you don't make the above request, ignore this email. Or contact us so that if you feel worried.
  </p>

  <div style='text-align: center; margin: 24px 0; background-color: rgba(33,158,188, 0.2); padding: 8px; font-size: 24px; color: #333; font-weight: 600'>${code}</div>

  <p style='font-size: 18px; color: #f73131;'>Note: The authentication code is valid only for ${VERIFY_CODE_EXP} minutes. Please do not send this code to anyone.</p>

  <p style='font-size: 18px; color: #777;'>Thank you very much,<br>${APP_NAME} Team</p>
</div>`;
