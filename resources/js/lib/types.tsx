import { Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  email_verified_at?: string;
}

export interface ISchoolInfo {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  principal: string;
  country: string;
  phone: string;
  teacher_incharge: string;
  address: string;
  user_id: string;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: any;
    authenticated: boolean;
    user: IUser;
    schoolInfo?: ISchoolInfo;
  }
}
