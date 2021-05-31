export const INSTRUCTOR_INTERFACE = {
    APP_NAME: "Vlearn",
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_DEEP_LINKING_IMAGE: false,
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 100,
    RECENT_LIST_ENABLED: false,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    DISPLAY_WELCOME_PAGE_CONTENT: false,
    // DISABLE_FOCUS_INDICATOR: true,
    // DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
    SET_FILMSTRIP_ENABLED: false,
    HIDE_KICK_BUTTON_FOR_GUESTS: true,
    filmStripOnly: true,
    DEFAULT_LOGO_URL: "",
    TOOLBAR_BUTTONS: ([
        'microphone', 'camera', 'desktop', 'fullscreen',
        'fodeviceselection', 'profile', 'info', 'record', 'recording',
        // 'chat',
        'etherpad', 'settings',
        'videoquality', 'filmstrip', 'stats', 'shortcuts',
        'videobackgroundblur', 'download', 'help',
        'mute-everyone', 'mute-video-everyone'
    ]),
}
export const STUDENT_INTERFACE = {
    APP_NAME: "Vlearn",
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_DEEP_LINKING_IMAGE: false,
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 100,
    RECENT_LIST_ENABLED: false,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    DISPLAY_WELCOME_PAGE_CONTENT: false,
    SET_FILMSTRIP_ENABLED: false,
    HIDE_KICK_BUTTON_FOR_GUESTS: true,
    filmStripOnly: true,
    DEFAULT_LOGO_URL: "",
    TOOLBAR_BUTTONS: ([
        'fullscreen',
        'profile', 'info',
        // 'chat',
        'raisehand',
        'videoquality', 'filmstrip', 'shortcuts',
        'download'
    ]),
}
export const INSTRUCTOR_CONFIG = {
    disableTileView: true,
    startWithVideoMuted: false,
    startWithAudioMuted: false,
}
export const STUDENT_CONFIG = {
    disableTileView: true,
    startWithVideoMuted: true,
    startWithAudioMuted: true,
    remoteVideoMenu:
    {
        disableKick: true,
    }
}