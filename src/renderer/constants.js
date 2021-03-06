export const PLAYBACKSTATE = Object.freeze({
  PLAYING: Symbol('playing'),
  PAUSED: Symbol('paused'),
  UNKNOWN: Symbol('unknown'),
});

export const bar = 'bar';

export const WIDTH_OF_SCREENSHOT = 170;
export const HALF_WIDTH_OF_SCREENSHOT = 85;
export const SCREENSHOT_SIDE_MARGIN_WIDTH = 16;

export const PROGRESS_BAR_HEIGHT = '10px';
export const PROGRESS_BAR_SLIDER_HIDE_HEIGHT = '4px';
export const PROGRESS_BAR_HIDE_HEIGHT = '0px';

export const FOOL_PROOFING_BAR_WIDTH = 20;

export const DEFAULT_VIDEO_EVENTS = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'ended',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'resize',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  'audiotrack',
];
export const DEFAULT_VIDEO_OPTIONS = [
  'autoplay',
  'controls',
  'crossOrigin',
  'currentTime',
  'defaultMuted',
  'defaultPlaybackRate',
  'loop',
  'mediaGroup',
  'muted',
  'playbackRate',
  'preload',
  'src',
  'volume',
];
export const THUMBNAIL_DB_NAME = 'splayerx-preview-thumbnails';
export const INFO_DATABASE_NAME = 'Info';
export const THUMBNAIL_OBJECT_STORE_NAME = 'the-preview-thumbnail';
export const INFODB_VERSION = 1;
/**
 * Remember to increment the INFODB_VERSION after updating the following INFO_SCHEMA
 */
export const INFO_SCHEMA = [
  {
    name: 'recent-played',
    indexes: ['lastOpened', 'path', 'lastPlayedTime'],
  },
  {
    name: THUMBNAIL_OBJECT_STORE_NAME,
  },
];

export const DATADB_NAME = 'data';
export const SUBTITLE_OBJECTSTORE_NAME = 'subtitles';
export const DATADB_VERSION = 1;
export const DATADB_SHCEMAS = [
  {
    version: 1,
    schema: [
      {
        name: SUBTITLE_OBJECTSTORE_NAME,
        options: {
          autoIncrement: true,
        },
        indexes: [
          {
            name: 'type',
            unique: false,
          },
          {
            name: 'src',
            unique: false,
          },
          {
            name: 'format',
            unique: false,
          },
          {
            name: 'language',
            unique: false,
          },
          {
            name: 'lastOpened',
            unique: false,
          },
        ],
        properties: [
          'type',
          'src',
          'format',
          'language',
          'data',
          'lastOpened',
        ],
      },
    ],
  },
];
