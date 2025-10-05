"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../../../utils/supabase/client";
import { useSession } from "@/context/SessionContext";
import Image from "next/image";

const PersonalInformation = () => {
  const supabase = createClient();
  const { profile } = useSession();

  const [address, setAddress] = useState({
    address_id: "",
    street_line1: "",
    street_line2: "",
    city: "",
    state: "", // subdivision field
    country: "",
    post_code: "",
  });

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    phone_number: "",
    avatar_url: "", // profile picture
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.profile_id) return;

    const getUserAddress = async (profileId: string) => {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("profile_id", profileId)
        .eq("is_primary", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching address:", error.message);
        return null;
      }
      return data;
    };
    const fetchAddress = async () => {
      setLoading(true);
      const data = await getUserAddress(profile.profile_id);
      if (data) {
        setAddress({
          address_id: data.address_id || "",
          street_line1: data.street_line1 || "",
          street_line2: data.street_line2 || "",
          city: data.city || "",
          state: data.subdivision || "",
          country: data.country || "",
          post_code: data.post_code || "",
        });
        setLoading(false);
      }
    };

    fetchAddress();
  }, [profile.profile_id, supabase]); // only depend on profile.id

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!profile?.profile_id) return;

      // set profile data
      setProfileData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        birth_date: profile.birth_date || "",
        phone_number: profile.phone_number || "",
        avatar_url: "", // profile picture
      });
      setLoading(false);
      // set address data
    };

    fetchData();
  }, [profile?.profile_id, supabase]);

  // handle profile form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle profile photo upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.profile_id) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${profile.profile_id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Erro ao carregar avatar:", uploadError.message);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setProfileData((prev) => ({ ...prev, avatar_url: publicUrl.publicUrl }));
  };

  // submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.profile_id) return;

    setLoading(true);

    try {
      // update profile table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          birth_date: profileData.birth_date,
          phone_number: profileData.phone_number,
          avatar_url: profileData.avatar_url,
        })
        .eq("profile_id", profile.profile_id);

      if (profileError) throw profileError;

      // update or insert address
      if (address.address_id) {
        const { error: addrError } = await supabase
          .from("addresses")
          .update({
            street_line1: address.street_line1,
            street_line2: address.street_line2,
            city: address.city,
            subdivision: address.state,
            country: address.country,
            post_code: address.post_code,
          })
          .eq("address_id", address.address_id);

        if (addrError) throw addrError;
      } else {
        const { error: addrInsertError } = await supabase
          .from("addresses")
          .insert([
            {
              profile_id: profile.profile_id,
              street_line1: address.street_line1,
              street_line2: address.street_line2,
              city: address.city,
              subdivision: address.state,
              country: address.country,
              post_code: address.post_code,
              is_primary: true,
            },
          ]);

        if (addrInsertError) throw addrInsertError;
      }

      alert("Informações atualizadas com sucesso!");
    } catch (err: any) {
      console.error("Erro ao atualizar:", err.message);
      alert("Erro ao atualizar informações.");
    } finally {
      setLoading(false);
    }
  };

  const size = 50;
  if(loading) {
    return <div className="flex justify-center items-center w-full h-full">
        <div
      className="relative flex justify-center items-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute rounded-full border-4 border-gray-200 border-t-orange-500 animate-spin"
        style={{ width: size, height: size }}
      />
      <div
        className="absolute rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          animationDuration: "0.7s",
        }}
      />
    </div>
    </div>;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <h1 className="text-2xl font-semibold mb-4">Informação Pessoal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Profile Photo */}
        <label className="flex flex-col">
          Foto de Perfil:
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="mt-1"
          />
          {profileData.avatar_url && (
            <Image
              src={profileData.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full mt-2"
            />
          )}
        </label>

        {/* Names */}
        <div className="flex flex-row justify-start gap-4">
          <label className="flex flex-col w-full">
            Primeiro Nome:
            <input
              name="firstName"
              type="text"
              value={profileData.first_name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col w-full">
            Último Nome:
            <input
              name="lastName"
              type="text"
              value={profileData.last_name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
        </div>

        {/* Birthdate */}
        <label className="flex flex-col">
          Data de Nascimento:
          <input
            name="birthDate"
            type="date"
            value={profileData.birth_date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          Telefone:
          <input
            name="phone_number"
            type="tel"
            value={profileData.phone_number}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Seu telefone"
            required
          />
        </label>

        {/* Address */}
        <label className="flex flex-col">
          Endereço 1:
          <input
            name="street_line1"
            type="text"
            value={address.street_line1}
            onChange={handleAddressChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Endereço 2:
          <input
            name="street_line2"
            type="text"
            value={address.street_line2}
            onChange={handleAddressChange}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          Cidade:
          <input
            name="city"
            type="text"
            value={address.city}
            onChange={handleAddressChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Estado / Província:
          <input
            name="state"
            type="text"
            value={address.state}
            onChange={handleAddressChange}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          País:
          <input
            name="country"
            type="text"
            value={address.country}
            onChange={handleAddressChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition disabled:opacity-50"
        >
          {loading ? "A salvar..." : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
