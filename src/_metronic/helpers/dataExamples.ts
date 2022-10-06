import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ProfileModel } from "../../client/client/user/Profile";

export interface MessageModel {
  id: string
  user: string
  type: 'in' | 'out'
  text: string
  time: string
  contentType?: `text` | `image`
  displayName?: string
  photoUrl?: string
  template?: boolean
  recepient_id?: string
  createdAt?: string
  isChatter?: boolean
}

export interface FeedEntryModel {
  id: string
  message: MessageModel
  createdAt: string
  roomId: string
  siteOfOrigin: string
  tag: string
}

export interface ProfileAndLatestMessageModel {
  profile_id: string,
  profile_name: string,
  message: MessageModel,
  read_status: 'unread' | 'read'
}

export interface AlertModel {
  title: string
  description: string
  time: string
  icon: string
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info'
}

const defaultAlerts: Array<AlertModel> = [
  {
    title: 'Project Alice',
    description: 'Phase 1 development',
    time: '1 hr',
    icon: 'icons/duotune/technology/teh008.svg',
    state: 'primary',
  },
  {
    title: 'HR Confidential',
    description: 'Confidential staff documents',
    time: '2 hrs',
    icon: 'icons/duotune/general/gen044.svg',
    state: 'danger',
  },
  {
    title: 'Company HR',
    description: 'Corporeate staff profiles',
    time: '5 hrs',
    icon: 'icons/duotune/finance/fin006.svg',
    state: 'warning',
  },
  {
    title: 'Project Redux',
    description: 'New frontend admin theme',
    time: '2 days',
    icon: 'icons/duotune/files/fil023.svg',
    state: 'success',
  },
  {
    title: 'Project Breafing',
    description: 'Product launch status update',
    time: '21 Jan',
    icon: 'icons/duotune/maps/map001.svg',
    state: 'primary',
  },
  {
    title: 'Banner Assets',
    description: 'Collection of banner images',
    time: '21 Jan',
    icon: 'icons/duotune/general/gen006.svg',
    state: 'info',
  },
  {
    title: 'Icon Assets',
    description: 'Collection of SVG icons',
    time: '20 March',
    icon: 'icons/duotune/art/art002.svg',
    state: 'warning',
  },
]
export interface LogModel {
  code: string
  state: 'success' | 'danger' | 'warning'
  message: string
  time: string
}

const defaultLogs: Array<LogModel> = [
  { code: '200 OK', state: 'success', message: 'New order', time: 'Just now' },
  { code: '500 ERR', state: 'danger', message: 'New customer', time: '2 hrs' },
  { code: '200 OK', state: 'success', message: 'Payment process', time: '5 hrs' },
  { code: '300 WRN', state: 'warning', message: 'Search query', time: '2 days' },
  { code: '200 OK', state: 'success', message: 'API connection', time: '1 week' },
  { code: '200 OK', state: 'success', message: 'Database restore', time: 'Mar 5' },
  { code: '300 WRN', state: 'warning', message: 'System update', time: 'May 15' },
  { code: '300 WRN', state: 'warning', message: 'Server OS update', time: 'Apr 3' },
  { code: '300 WRN', state: 'warning', message: 'API rollback', time: 'Jun 30' },
  { code: '500 ERR', state: 'danger', message: 'Refund process', time: 'Jul 10' },
  { code: '500 ERR', state: 'danger', message: 'Withdrawal process', time: 'Sep 10' },
  { code: '500 ERR', state: 'danger', message: 'Mail tasks', time: 'Dec 10' },
]

export interface NoteModel {
  id: string,
  uuid: string,
  text: string,
  createdAt: string,
  lastUpdated: string
}

export interface ImageModel {
  id: string,
  ownerId: string,
  photoURL: string,
  altURL?: string,
  uploadedAt: string,
  reference: string,
  type: "public" | "private"
}

export interface ProfileImageModel {
  info: ImageModel,
  receivedBy?: ProfileImageReceiverModel[]
}

export interface UserImageModel {
  info: ImageModel
}

export interface UserEditImageModel {
  id: string,
  url: string
}

export interface ProfileImageReceiverModel {
  id: string,
  receiver_id: string,
  receivedAt: string
}

export class PaginatedProfileModels {
  nextPageExists: boolean = false;
  append: boolean = false;
  lastVisible: QueryDocumentSnapshot<DocumentData> = null as any;
  profiles: ProfileModel[] = [];
}

export class InfoModel {
  displayName: string = "";
  photoURL: string = "";
  profileReference: string = "";
  birthday: string = "";
  age: number = 18;
  gender: string = "";
  weight: number = 0;
  height: number = 0;
  maritalStatus: string = "";
  bodyType: string = "";
  ethnicity: string = "";
  hairColor: string = "";
  eyeColor: string = "";
  sexualOrientation: string = "";
  country: string = "";
  language: string = "";
  aboutMe: string = "";
  lookingFor: string = "";
  tags: string[] = [];

  constructor (params:any)
  {
    this.displayName = params.displayName;
    this.photoURL = params.photoURL;
    this.profileReference = params.profileReference;
    this.birthday = params.birthday;
    this.age = params.age;
    this.gender = params.gender;
    this.weight = params.weight;
    this.height = params.height;
    this.maritalStatus = params.maritalStatus;
    this.bodyType = params.bodyType;
    this.ethnicity = params.ethnicity;
    this.hairColor = params.hairColor;
    this.eyeColor = params.eyeColor;
    this.sexualOrientation = params.sexualOrientation;
    this.country = params.country;
    this.language = params.language;
    this.aboutMe = params.aboutMe;
    this.lookingFor = params.lookingFor;
    this.tags = params.tags;
  }
}

export class GeolocationDetails {
  countryCode: string = "";
  countryName: string = "";
  city: string = "";
  postal: string = "";
  latitude: string = "";
  longitude: string = "";
  ipv4: string = "";
  state: string = "";

  constructor (params: any)
  {
    this.countryCode = params.countryCode;
    this.countryName = params.countryName;
    this.city = params.city;
    this.postal = params.postal;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.ipv4 = params.ipv4;
    this.state = params.state;
  }
}

export { defaultAlerts, defaultLogs }