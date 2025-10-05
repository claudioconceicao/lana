export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      accommodation_types: {
        Row: {
          accommodation_type_id: number
          name: string
        }
        Insert: {
          accommodation_type_id: number
          name: string
        }
        Update: {
          accommodation_type_id?: number
          name?: string
        }
        Relationships: []
      }
      active_devices: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_id: string
          device_type: string | null
          ip_address: unknown | null
          is_active: boolean | null
          last_active: string | null
          last_login: string | null
          os: string | null
          profile_id: string
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_id?: string
          device_type?: string | null
          ip_address?: unknown | null
          is_active?: boolean | null
          last_active?: string | null
          last_login?: string | null
          os?: string | null
          profile_id: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_id?: string
          device_type?: string | null
          ip_address?: unknown | null
          is_active?: boolean | null
          last_active?: string | null
          last_login?: string | null
          os?: string | null
          profile_id?: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "active_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      addresses: {
        Row: {
          address_id: string
          city: string | null
          country_id: number
          created_at: string | null
          is_primary: boolean | null
          label: string | null
          latitude: number | null
          longitude: number | null
          municipality_id: number | null
          post_code: string | null
          profile_id: string
          province_id: number | null
          street_line1: string
          street_line2: string | null
          updated_at: string | null
        }
        Insert: {
          address_id?: string
          city?: string | null
          country_id: number
          created_at?: string | null
          is_primary?: boolean | null
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          municipality_id?: number | null
          post_code?: string | null
          profile_id: string
          province_id?: number | null
          street_line1: string
          street_line2?: string | null
          updated_at?: string | null
        }
        Update: {
          address_id?: string
          city?: string | null
          country_id?: number
          created_at?: string | null
          is_primary?: boolean | null
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          municipality_id?: number | null
          post_code?: string | null
          profile_id?: string
          province_id?: number | null
          street_line1?: string
          street_line2?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
          {
            foreignKeyName: "addresses_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "addresses_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["province_id"]
          },
        ]
      }
      amenities: {
        Row: {
          amenity_id: number
          created_at: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          amenity_id?: number
          created_at?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          amenity_id?: number
          created_at?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_id: number
          created_at: string | null
          end_date: string
          guest_id: string
          guests_count: number | null
          listing_id: string
          start_date: string
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at: string | null
        }
        Insert: {
          booking_id?: number
          created_at?: string | null
          end_date: string
          guest_id: string
          guests_count?: number | null
          listing_id: string
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at?: string | null
        }
        Update: {
          booking_id?: number
          created_at?: string | null
          end_date?: string
          guest_id?: string
          guests_count?: number | null
          listing_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      cancellation_policies: {
        Row: {
          cancellation_policy_id: number
          created_at: string | null
          cutoff_days: number
          description: string
          name: string
          refund_percentage: number
          updated_at: string | null
        }
        Insert: {
          cancellation_policy_id?: number
          created_at?: string | null
          cutoff_days: number
          description: string
          name: string
          refund_percentage: number
          updated_at?: string | null
        }
        Update: {
          cancellation_policy_id?: number
          created_at?: string | null
          cutoff_days?: number
          description?: string
          name?: string
          refund_percentage?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          chat_id: number
          created_at: string | null
          guest_id: string
          host_id: string
        }
        Insert: {
          chat_id?: number
          created_at?: string | null
          guest_id: string
          host_id: string
        }
        Update: {
          chat_id?: number
          created_at?: string | null
          guest_id?: string
          host_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "chats_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      countries: {
        Row: {
          country_id: number
          iso_code: string
          name: string
        }
        Insert: {
          country_id?: number
          iso_code: string
          name: string
        }
        Update: {
          country_id?: number
          iso_code?: string
          name?: string
        }
        Relationships: []
      }
      districts: {
        Row: {
          district_id: number
          municipality_id: number
          name: string
          province_id: number
        }
        Insert: {
          district_id?: number
          municipality_id: number
          name: string
          province_id: number
        }
        Update: {
          district_id?: number
          municipality_id?: number
          name?: string
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "districts_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "districts_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["province_id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      host_payouts: {
        Row: {
          amount: number
          currency: string | null
          host_id: string
          payout_date: string | null
          payout_id: number
          provider_payout_id: string | null
        }
        Insert: {
          amount: number
          currency?: string | null
          host_id: string
          payout_date?: string | null
          payout_id?: number
          provider_payout_id?: string | null
        }
        Update: {
          amount?: number
          currency?: string | null
          host_id?: string
          payout_date?: string | null
          payout_id?: number
          provider_payout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "host_payouts_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      listing_availability: {
        Row: {
          date: string
          id: number
          is_available: boolean | null
          listing_id: string
        }
        Insert: {
          date: string
          id?: number
          is_available?: boolean | null
          listing_id: string
        }
        Update: {
          date?: string
          id?: number
          is_available?: boolean | null
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_availability_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      listing_images: {
        Row: {
          created_at: string | null
          image_id: number
          image_url: string
          is_primary: boolean | null
          listing_id: string
        }
        Insert: {
          created_at?: string | null
          image_id?: number
          image_url: string
          is_primary?: boolean | null
          listing_id: string
        }
        Update: {
          created_at?: string | null
          image_id?: number
          image_url?: string
          is_primary?: boolean | null
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      listing_rules: {
        Row: {
          additional_rules: string[] | null
          is_children_allowed: boolean | null
          is_events_or_party_allowed: boolean | null
          is_pet_allowed: boolean | null
          is_smoking_allowed: boolean | null
          listing_id: string
          listing_rule_id: string
          quiet_hours_end: string | null
          quiet_hours_start: string | null
        }
        Insert: {
          additional_rules?: string[] | null
          is_children_allowed?: boolean | null
          is_events_or_party_allowed?: boolean | null
          is_pet_allowed?: boolean | null
          is_smoking_allowed?: boolean | null
          listing_id: string
          listing_rule_id?: string
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
        }
        Update: {
          additional_rules?: string[] | null
          is_children_allowed?: boolean | null
          is_events_or_party_allowed?: boolean | null
          is_pet_allowed?: boolean | null
          is_smoking_allowed?: boolean | null
          listing_id?: string
          listing_rule_id?: string
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_rules_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      listings: {
        Row: {
          accommodation_type: number | null
          advance_notice_days: number | null
          base_price: number
          blackout_dates: unknown[] | null
          booking_window_days: number | null
          building_floors: number | null
          cancellation_policy_id: number | null
          checkin_time_end: string | null
          checkin_time_start: string | null
          checkout_time: string | null
          city: string
          cleaning_fee: number | null
          country_code: string
          created_at: string | null
          deposit: number | null
          description: string
          district_id: number | null
          extra_guest_fee: number | null
          floor: number | null
          getting_around: string | null
          host_id: string
          latitude: number | null
          listing_id: string
          listing_rule_id: string | null
          location_sharing: string | null
          longitude: number | null
          max_guests: number
          max_stay: number
          min_stay: number
          monthly_discount: number | null
          municipality_id: number
          name: string | null
          neighbourhood_description: string | null
          no_of_bathrooms: number
          no_of_bedrooms: number
          no_of_beds: number | null
          pet_fee: number | null
          post_code: string | null
          preparation_time_days: number | null
          property_type: number | null
          province_id: number
          restrict_checkin_days: string[] | null
          restrict_checkout_days: string[] | null
          restricted_checkout_days: string[] | null
          status: Database["public"]["Enums"]["listing_status"] | null
          street_line1: string
          street_line2: string | null
          title: string
          updated_at: string | null
          weekend_price: number | null
          weekly_discount: number | null
        }
        Insert: {
          accommodation_type?: number | null
          advance_notice_days?: number | null
          base_price: number
          blackout_dates?: unknown[] | null
          booking_window_days?: number | null
          building_floors?: number | null
          cancellation_policy_id?: number | null
          checkin_time_end?: string | null
          checkin_time_start?: string | null
          checkout_time?: string | null
          city: string
          cleaning_fee?: number | null
          country_code?: string
          created_at?: string | null
          deposit?: number | null
          description: string
          district_id?: number | null
          extra_guest_fee?: number | null
          floor?: number | null
          getting_around?: string | null
          host_id: string
          latitude?: number | null
          listing_id?: string
          listing_rule_id?: string | null
          location_sharing?: string | null
          longitude?: number | null
          max_guests?: number
          max_stay?: number
          min_stay?: number
          monthly_discount?: number | null
          municipality_id: number
          name?: string | null
          neighbourhood_description?: string | null
          no_of_bathrooms?: number
          no_of_bedrooms?: number
          no_of_beds?: number | null
          pet_fee?: number | null
          post_code?: string | null
          preparation_time_days?: number | null
          property_type?: number | null
          province_id: number
          restrict_checkin_days?: string[] | null
          restrict_checkout_days?: string[] | null
          restricted_checkout_days?: string[] | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          street_line1: string
          street_line2?: string | null
          title: string
          updated_at?: string | null
          weekend_price?: number | null
          weekly_discount?: number | null
        }
        Update: {
          accommodation_type?: number | null
          advance_notice_days?: number | null
          base_price?: number
          blackout_dates?: unknown[] | null
          booking_window_days?: number | null
          building_floors?: number | null
          cancellation_policy_id?: number | null
          checkin_time_end?: string | null
          checkin_time_start?: string | null
          checkout_time?: string | null
          city?: string
          cleaning_fee?: number | null
          country_code?: string
          created_at?: string | null
          deposit?: number | null
          description?: string
          district_id?: number | null
          extra_guest_fee?: number | null
          floor?: number | null
          getting_around?: string | null
          host_id?: string
          latitude?: number | null
          listing_id?: string
          listing_rule_id?: string | null
          location_sharing?: string | null
          longitude?: number | null
          max_guests?: number
          max_stay?: number
          min_stay?: number
          monthly_discount?: number | null
          municipality_id?: number
          name?: string | null
          neighbourhood_description?: string | null
          no_of_bathrooms?: number
          no_of_bedrooms?: number
          no_of_beds?: number | null
          pet_fee?: number | null
          post_code?: string | null
          preparation_time_days?: number | null
          property_type?: number | null
          province_id?: number
          restrict_checkin_days?: string[] | null
          restrict_checkout_days?: string[] | null
          restricted_checkout_days?: string[] | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          street_line1?: string
          street_line2?: string | null
          title?: string
          updated_at?: string | null
          weekend_price?: number | null
          weekly_discount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_accommodation_type_fkey"
            columns: ["accommodation_type"]
            isOneToOne: false
            referencedRelation: "accommodation_types"
            referencedColumns: ["accommodation_type_id"]
          },
          {
            foreignKeyName: "listings_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["cancellation_policy_id"]
          },
          {
            foreignKeyName: "listings_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["iso_code"]
          },
          {
            foreignKeyName: "listings_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "listings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "listings_listing_rule_id_fkey"
            columns: ["listing_rule_id"]
            isOneToOne: false
            referencedRelation: "listing_rules"
            referencedColumns: ["listing_rule_id"]
          },
          {
            foreignKeyName: "listings_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "listings_property_type_fkey"
            columns: ["property_type"]
            isOneToOne: false
            referencedRelation: "property_types"
            referencedColumns: ["property_type_id"]
          },
          {
            foreignKeyName: "listings_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["province_id"]
          },
        ]
      }
      listings_amenities: {
        Row: {
          amenity_id: number
          listing_id: string
        }
        Insert: {
          amenity_id: number
          listing_id: string
        }
        Update: {
          amenity_id?: number
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["amenity_id"]
          },
          {
            foreignKeyName: "listings_amenities_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: number
          content: string
          created_at: string | null
          message_id: string
          sender_id: string
          status: Database["public"]["Enums"]["message_status"] | null
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string | null
          message_id?: string
          sender_id: string
          status?: Database["public"]["Enums"]["message_status"] | null
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string | null
          message_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["message_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      municipalities: {
        Row: {
          municipality_id: number
          name: string
          province_id: number
        }
        Insert: {
          municipality_id?: number
          name: string
          province_id: number
        }
        Update: {
          municipality_id?: number
          name?: string
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "municipalities_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["province_id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          body: string
          channel: string
          created_at: string | null
          is_read: boolean | null
          is_sent: boolean | null
          metadata: Json | null
          notification_id: string
          profile_id: string
          read_at: string | null
          sent_at: string | null
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          body: string
          channel: string
          created_at?: string | null
          is_read?: boolean | null
          is_sent?: boolean | null
          metadata?: Json | null
          notification_id?: string
          profile_id: string
          read_at?: string | null
          sent_at?: string | null
          title: string
          type: string
        }
        Update: {
          action_url?: string | null
          body?: string
          channel?: string
          created_at?: string | null
          is_read?: boolean | null
          is_sent?: boolean | null
          metadata?: Json | null
          notification_id?: string
          profile_id?: string
          read_at?: string | null
          sent_at?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          account_email: string | null
          brand: string | null
          created_at: string | null
          expiry_month: number | null
          expiry_year: number | null
          is_primary: boolean | null
          last4: string | null
          payment_method_id: string
          phone_number: string | null
          profile_id: string
          provider: string | null
          provider_pm_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          account_email?: string | null
          brand?: string | null
          created_at?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          is_primary?: boolean | null
          last4?: string | null
          payment_method_id?: string
          phone_number?: string | null
          profile_id: string
          provider?: string | null
          provider_pm_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          account_email?: string | null
          brand?: string | null
          created_at?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          is_primary?: boolean | null
          last4?: string | null
          payment_method_id?: string
          phone_number?: string | null
          profile_id?: string
          provider?: string | null
          provider_pm_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: number
          currency: string | null
          payment_date: string | null
          payment_id: number
          payment_method: string | null
          provider_payment_id: string | null
        }
        Insert: {
          amount: number
          booking_id: number
          currency?: string | null
          payment_date?: string | null
          payment_id?: number
          payment_method?: string | null
          provider_payment_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: number
          currency?: string | null
          payment_date?: string | null
          payment_id?: number
          payment_method?: string | null
          provider_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      profile_roles: {
        Row: {
          assigned_at: string | null
          profile_id: string
          role_id: number
        }
        Insert: {
          assigned_at?: string | null
          profile_id: string
          role_id: number
        }
        Update: {
          assigned_at?: string | null
          profile_id?: string
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profile_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          identity_verified: boolean | null
          is_verified: boolean | null
          last_name: string
          national_id: string | null
          nationality: string | null
          phone_number: string | null
          preferred_language: string | null
          profile_id: string
          profile_picture: string | null
          status: Database["public"]["Enums"]["profile_status"] | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          first_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          identity_verified?: boolean | null
          is_verified?: boolean | null
          last_name: string
          national_id?: string | null
          nationality?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_id: string
          profile_picture?: string | null
          status?: Database["public"]["Enums"]["profile_status"] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          identity_verified?: boolean | null
          is_verified?: boolean | null
          last_name?: string
          national_id?: string | null
          nationality?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_id?: string
          profile_picture?: string | null
          status?: Database["public"]["Enums"]["profile_status"] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      property_types: {
        Row: {
          name: string
          property_type_id: number
        }
        Insert: {
          name: string
          property_type_id: number
        }
        Update: {
          name?: string
          property_type_id?: number
        }
        Relationships: []
      }
      provinces: {
        Row: {
          country_id: number
          name: string
          province_id: number
        }
        Insert: {
          country_id: number
          name: string
          province_id?: number
        }
        Update: {
          country_id?: number
          name?: string
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "provinces_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: number
          comment: string | null
          created_at: string | null
          rating: number
          review_id: number
          reviewer_id: string
          updated_at: string | null
        }
        Insert: {
          booking_id: number
          comment?: string | null
          created_at?: string | null
          rating: number
          review_id?: number
          reviewer_id: string
          updated_at?: string | null
        }
        Update: {
          booking_id?: number
          comment?: string | null
          created_at?: string | null
          rating?: number
          review_id?: number
          reviewer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          name: string
          role_id: number
        }
        Insert: {
          description?: string | null
          name: string
          role_id?: number
        }
        Update: {
          description?: string | null
          name?: string
          role_id?: number
        }
        Relationships: []
      }
      rules_catalog: {
        Row: {
          category: string | null
          description: string | null
          name: string
          rule_id: number
        }
        Insert: {
          category?: string | null
          description?: string | null
          name: string
          rule_id?: number
        }
        Update: {
          category?: string | null
          description?: string | null
          name?: string
          rule_id?: number
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          back_image_url: string | null
          country_of_issue: string | null
          created_at: string | null
          document_id: string
          document_number: string | null
          document_type: string
          expiry_date: string | null
          front_image_url: string | null
          profile_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          updated_at: string | null
        }
        Insert: {
          back_image_url?: string | null
          country_of_issue?: string | null
          created_at?: string | null
          document_id: string
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          front_image_url?: string | null
          profile_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string | null
        }
        Update: {
          back_image_url?: string | null
          country_of_issue?: string | null
          created_at?: string | null
          document_id?: string
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          front_image_url?: string | null
          profile_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "verification_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
    }
    Views: {
      listing_ratings: {
        Row: {
          average_rating: number | null
          listing_id: string | null
          review_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
    }
    Functions: {
      check_user_exists: {
        Args: { user_email: string }
        Returns: boolean
      }
    }
    Enums: {
      booking_status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
      gender_type: "Male" | "Female" | "Other"
      listing_status: "Listed" | "Unlisted" | "Draft"
      message_status: "Sent" | "Delivered" | "Read"
      profile_status: "Active" | "Inactive" | "Banned"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["Pending", "Confirmed", "Cancelled", "Completed"],
      gender_type: ["Male", "Female", "Other"],
      listing_status: ["Listed", "Unlisted", "Draft"],
      message_status: ["Sent", "Delivered", "Read"],
      profile_status: ["Active", "Inactive", "Banned"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
