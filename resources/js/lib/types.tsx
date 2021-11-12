import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  type: string;
  email_verified_at?: string;

  name?: string;
  principal?: string;
  principal_mobile?: string;
  teacher_incharge?: string;
  teacher_incharge_email?: string;
  teacher_incharge_mobile?: string;
  address?: string;
  postal_code?: string;

  school_id?: number;
  student_name?: string;
  student_mobile?: string;
  question_id?: number;
  last_solved?: string;
  logged_in?: boolean;

  school?: IUser;
  teams?: IUser[];
  attempts?: IUserAttempt[];
  reset_link?: string;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag;
    authenticated: boolean;
    user: IUser;
    regDate: string;
    regEndDate: string;
    startDate: string;
    endDate: string;
  };
}

export interface IQuestion {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  hint?: string;
  answer?: string;
}

export interface IUserAttempt {
  id: number;
  created_at: string;
  updated_at: string;
  attempt: string;
  user_id: number;
  question_id: number;
  user?: IUser;
  question?: IQuestion;
}
