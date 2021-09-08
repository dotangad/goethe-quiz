import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

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
  user_id: number;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag;
    authenticated: boolean;
    user: IUser;
    schoolInfo?: ISchoolInfo;
    startDate: string;
    endDate: string;
  };
}

export interface ITeamInfo {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  school_id: number;
  student_1: string;
  student_2: string;
  email: string;
}

export interface IQuestion {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  hint: string;
  answer: string;
}
