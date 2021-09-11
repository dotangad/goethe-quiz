import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  email_verified_at?: string;

  name?: string;
  principal?: string;
  country?: string;
  phone?: string;
  teacher_incharge?: string;
  address?: string;

  school_id?: number;
  student_1?: string;
  student_2?: string;

  school?: IUser;
  teams?: IUser[];
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag;
    authenticated: boolean;
    user: IUser;
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
