export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      author_status: {
        Row: {
          id: string;
          last_active: string;
        };
        Insert: {
          id?: string;
          last_active?: string;
        };
        Update: {
          id?: string;
          last_active?: string;
        };
        Relationships: [];
      };
      availability_subscriber: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: number;
        };
        Relationships: [];
      };
      blog_reactions: {
        Row: {
          created_at: string | null;
          id: number;
          post_slug: string;
          reaction: string;
          user_identifier: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          post_slug: string;
          reaction: string;
          user_identifier: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          post_slug?: string;
          reaction?: string;
          user_identifier?: string;
        };
        Relationships: [];
      };
      certifications: {
        Row: {
          completion_date: string;
          created_at: string | null;
          description: string | null;
          id: number;
          image_url: string;
          name: string;
          platform: string;
          updated_at: string | null;
          verification_link: string | null;
        };
        Insert: {
          completion_date: string;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          image_url: string;
          name: string;
          platform: string;
          updated_at?: string | null;
          verification_link?: string | null;
        };
        Update: {
          completion_date?: string;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          image_url?: string;
          name?: string;
          platform?: string;
          updated_at?: string | null;
          verification_link?: string | null;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
          messages: Json | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: never;
          messages?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: never;
          messages?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          admin_responde_draft: string | null;
          cost_expectations: string | null;
          created_at: string | null;
          custom_stack: string | null;
          email: string;
          id: number;
          message: string | null;
          name: string;
          project_description: string | null;
          purpose: string;
          responded: boolean;
          responded_at: string | null;
          stack: string | null;
          user_session: string;
        };
        Insert: {
          admin_responde_draft?: string | null;
          cost_expectations?: string | null;
          created_at?: string | null;
          custom_stack?: string | null;
          email: string;
          id?: number;
          message?: string | null;
          name: string;
          project_description?: string | null;
          purpose: string;
          responded?: boolean;
          responded_at?: string | null;
          stack?: string | null;
          user_session?: string;
        };
        Update: {
          admin_responde_draft?: string | null;
          cost_expectations?: string | null;
          created_at?: string | null;
          custom_stack?: string | null;
          email?: string;
          id?: number;
          message?: string | null;
          name?: string;
          project_description?: string | null;
          purpose?: string;
          responded?: boolean;
          responded_at?: string | null;
          stack?: string | null;
          user_session?: string;
        };
        Relationships: [];
      };
      guestbook: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
        };
        Relationships: [];
      };
      in_media: {
        Row: {
          category: string;
          date: string;
          description: string;
          id: number;
          publication: string;
          title: string;
          url: string;
        };
        Insert: {
          category: string;
          date: string;
          description: string;
          id?: number;
          publication: string;
          title: string;
          url: string;
        };
        Update: {
          category?: string;
          date?: string;
          description?: string;
          id?: number;
          publication?: string;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      iprecord: {
        Row: {
          created_at: string;
          ipaddress: string;
          reactions: number;
          shares: number;
          views: number;
        };
        Insert: {
          created_at?: string;
          ipaddress: string;
          reactions?: number;
          shares?: number;
          views?: number;
        };
        Update: {
          created_at?: string;
          ipaddress?: string;
          reactions?: number;
          shares?: number;
          views?: number;
        };
        Relationships: [];
      };
      journey_events: {
        Row: {
          color: string;
          date: string;
          description: string;
          icon: string;
          id: number;
          is_current: boolean;
          label: string | null;
          title: string;
        };
        Insert: {
          color: string;
          date: string;
          description: string;
          icon: string;
          id?: number;
          is_current: boolean;
          label?: string | null;
          title: string;
        };
        Update: {
          color?: string;
          date?: string;
          description?: string;
          icon?: string;
          id?: number;
          is_current?: boolean;
          label?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      page_views: {
        Row: {
          clipboardshare: number;
          facebookshare: number;
          id: number;
          slug: string;
          twittershare: number;
          updated_at: string;
          views: number;
        };
        Insert: {
          clipboardshare?: number;
          facebookshare?: number;
          id?: number;
          slug: string;
          twittershare?: number;
          updated_at?: string;
          views?: number;
        };
        Update: {
          clipboardshare?: number;
          facebookshare?: number;
          id?: number;
          slug?: string;
          twittershare?: number;
          updated_at?: string;
          views?: number;
        };
        Relationships: [];
      };
      popular_tags: {
        Row: {
          count: number | null;
          href: string;
          icon_type: string;
          id: number;
          slug: string;
          title: string;
        };
        Insert: {
          count?: number | null;
          href: string;
          icon_type: string;
          id?: number;
          slug: string;
          title: string;
        };
        Update: {
          count?: number | null;
          href?: string;
          icon_type?: string;
          id?: number;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          built_with: string[];
          created_at: string | null;
          description: string;
          id: string;
          img_src: string;
          is_dark_badge_needed: boolean | null;
          repo: string | null;
          stack: string | null;
          title: string;
          type: string;
          updated_at: string | null;
          url: string | null;
        };
        Insert: {
          built_with: string[];
          created_at?: string | null;
          description: string;
          id?: string;
          img_src: string;
          is_dark_badge_needed?: boolean | null;
          repo?: string | null;
          stack?: string | null;
          title: string;
          type: string;
          updated_at?: string | null;
          url?: string | null;
        };
        Update: {
          built_with?: string[];
          created_at?: string | null;
          description?: string;
          id?: string;
          img_src?: string;
          is_dark_badge_needed?: boolean | null;
          repo?: string | null;
          stack?: string | null;
          title?: string;
          type?: string;
          updated_at?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      users_admin: {
        Row: {
          email: string;
          id: string;
          is_superadmin: boolean | null;
        };
        Insert: {
          email: string;
          id: string;
          is_superadmin?: boolean | null;
        };
        Update: {
          email?: string;
          id?: string;
          is_superadmin?: boolean | null;
        };
        Relationships: [];
      };
      wl_comment: {
        Row: {
          comment: string | null;
          createdat: string | null;
          id: number;
          insertedat: string;
          ip: string | null;
          like: number | null;
          link: string | null;
          mail: string | null;
          nick: string | null;
          pid: number | null;
          rid: number | null;
          status: string;
          sticky: number | null;
          ua: string | null;
          updatedat: string | null;
          url: string | null;
          user_id: number | null;
        };
        Insert: {
          comment?: string | null;
          createdat?: string | null;
          id?: number;
          insertedat?: string;
          ip?: string | null;
          like?: number | null;
          link?: string | null;
          mail?: string | null;
          nick?: string | null;
          pid?: number | null;
          rid?: number | null;
          status?: string;
          sticky?: number | null;
          ua?: string | null;
          updatedat?: string | null;
          url?: string | null;
          user_id?: number | null;
        };
        Update: {
          comment?: string | null;
          createdat?: string | null;
          id?: number;
          insertedat?: string;
          ip?: string | null;
          like?: number | null;
          link?: string | null;
          mail?: string | null;
          nick?: string | null;
          pid?: number | null;
          rid?: number | null;
          status?: string;
          sticky?: number | null;
          ua?: string | null;
          updatedat?: string | null;
          url?: string | null;
          user_id?: number | null;
        };
        Relationships: [];
      };
      wl_counter: {
        Row: {
          createdat: string | null;
          id: number;
          reaction0: number | null;
          reaction1: number | null;
          reaction2: number | null;
          reaction3: number | null;
          reaction4: number | null;
          reaction5: number | null;
          reaction6: number | null;
          reaction7: number | null;
          reaction8: number | null;
          time: number | null;
          updatedat: string | null;
          url: string;
        };
        Insert: {
          createdat?: string | null;
          id?: number;
          reaction0?: number | null;
          reaction1?: number | null;
          reaction2?: number | null;
          reaction3?: number | null;
          reaction4?: number | null;
          reaction5?: number | null;
          reaction6?: number | null;
          reaction7?: number | null;
          reaction8?: number | null;
          time?: number | null;
          updatedat?: string | null;
          url?: string;
        };
        Update: {
          createdat?: string | null;
          id?: number;
          reaction0?: number | null;
          reaction1?: number | null;
          reaction2?: number | null;
          reaction3?: number | null;
          reaction4?: number | null;
          reaction5?: number | null;
          reaction6?: number | null;
          reaction7?: number | null;
          reaction8?: number | null;
          time?: number | null;
          updatedat?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      wl_users: {
        Row: {
          '2fa': string | null;
          avatar: string | null;
          createdat: string | null;
          display_name: string;
          email: string;
          facebook: string | null;
          github: string | null;
          google: string | null;
          id: number;
          label: string | null;
          password: string;
          qq: string | null;
          twitter: string | null;
          type: string;
          updatedat: string | null;
          url: string | null;
          weibo: string | null;
        };
        Insert: {
          '2fa'?: string | null;
          avatar?: string | null;
          createdat?: string | null;
          display_name?: string;
          email?: string;
          facebook?: string | null;
          github?: string | null;
          google?: string | null;
          id?: number;
          label?: string | null;
          password?: string;
          qq?: string | null;
          twitter?: string | null;
          type?: string;
          updatedat?: string | null;
          url?: string | null;
          weibo?: string | null;
        };
        Update: {
          '2fa'?: string | null;
          avatar?: string | null;
          createdat?: string | null;
          display_name?: string;
          email?: string;
          facebook?: string | null;
          github?: string | null;
          google?: string | null;
          id?: number;
          label?: string | null;
          password?: string;
          qq?: string | null;
          twitter?: string | null;
          type?: string;
          updatedat?: string | null;
          url?: string | null;
          weibo?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_rate_limit: {
        Args: {
          p_email: string;
        };
        Returns: boolean;
      };
      delete_guestbook_entry: {
        Args: {
          p_id: string;
        };
        Returns: boolean;
      };
      get_guestbook_entries: {
        Args: {
          limit_count: number;
        };
        Returns: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        }[];
      };
      get_latest_guestbook_entries: {
        Args: {
          limit_count: number;
        };
        Returns: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        }[];
      };
      get_reaction_counts: {
        Args: {
          slug: string;
        };
        Returns: {
          reaction: string;
          count: number;
        }[];
      };
      save_guestbook_entry: {
        Args: {
          p_name: string;
          p_email: string;
          p_message: string;
        };
        Returns: string;
      };
      update_guestbook_entry: {
        Args: {
          p_id: string;
          p_message: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
