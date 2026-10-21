import { Link, UserRound } from "lucide-react";
import DetailRow from "./DetailRow";
import SectionTitle from "./SectionTitle";
import SocialLinks from "./SocialLinks";

function PersonalInformation({ user }) {

  return (
    <div className="p-7 lg:border-r lg:border-slate-200 dark:lg:border-[#112a46]">
      <SectionTitle
        icon={UserRound}
        title="Personal Information"
      />

      <div className="space-y-5">
        <DetailRow
          label="Full Name"
          value={user?.fullname}
        />

        <DetailRow
          label="Email Address"
          value={user?.email}
        />

        <DetailRow
          label="Phone Number"
          value={user?.phone || "Not provided"}
        />

        <DetailRow
          label="Date of Birth"
          value={user?.dateOfBirth || "Not provided"}
        />

        <DetailRow
          label="Location"
          value={user?.location || "Not provided"}
        />

        <DetailRow
          label="Bio"
          value={user?.bio || "No bio available"}
        />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-7 dark:border-[#112a46]">
        <SectionTitle
          icon={Link}
          title="Social Links"
        />

        <SocialLinks user={user} />
      </div>
    </div>
  );
}

export default PersonalInformation;