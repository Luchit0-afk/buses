import { notification } from 'antd';

export const modalNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};