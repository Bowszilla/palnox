export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      pals: {
        Row: {
          id: string
          pal_number: number
          name: string
          element_primary: string
          element_secondary: string | null
          rarity: string
          image_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          pal_number: number
          name: string
          element_primary: string
          element_secondary?: string | null
          rarity: string
          image_url?: string | null
          description?: string | null
        }
        Update: {
          pal_number?: number
          name?: string
          element_primary?: string
          element_secondary?: string | null
          rarity?: string
          image_url?: string | null
          description?: string | null
        }
      }
      traits: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          effect: string | null
          rarity: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          effect?: string | null
          rarity?: string | null
        }
        Update: {
          name?: string
          description?: string | null
          category?: string | null
          effect?: string | null
          rarity?: string | null
        }
      }
      user_collection: {
        Row: {
          id: string
          user_id: string
          pal_id: string
          is_captured: boolean
          is_alpha: boolean
          is_lucky: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pal_id: string
          is_captured?: boolean
          is_alpha?: boolean
          is_lucky?: boolean
          notes?: string | null
        }
        Update: {
          is_captured?: boolean
          is_alpha?: boolean
          is_lucky?: boolean
          notes?: string | null
          updated_at?: string
        }
      }
      assistant_conversations: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
        }
        Update: {
          title?: string | null
          updated_at?: string
        }
      }
      assistant_messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: 'user' | 'assistant'
          content: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
