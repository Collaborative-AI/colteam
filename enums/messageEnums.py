from enum import Enum


class MessageType(Enum):
    INVALID_CREDENTIALS = 1
    LOGIN_SUCCESSFULLY = 2
    UPDATE_SUCCESSFULLY = 3
    LOGOUT_SUCCESSFULLY = 4
