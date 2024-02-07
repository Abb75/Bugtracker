import {  toast } from 'sonner'

export const SendInfoNotification = (text) => {
    return toast.info(text)
}

export const SendSuccessNotification = (text) => {
    return toast.success(text)
}

export const SendErrorNotification = (text) => {
    return toast.error(text)
}