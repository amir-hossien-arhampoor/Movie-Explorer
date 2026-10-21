import { Shield, SlidersHorizontal } from "lucide-react";
import DetailRow from "./DetailRow";
import SectionTitle from "./SectionTitle";
import StatusBadge from "./StatusBadge";
import BooleanValue from "./BooleanValue";
import { capitalizeFirstLetter } from "@/utils/date";

function AccountDetails({ user }) {
  const isActive = user?.status === "active";

  return (
    <div className="p-7">
      <SectionTitle
        icon={Shield}
        title="Account Details"
      />

      <div className="space-y-5">
        <DetailRow
          label="Account Status"
          value={
            <StatusBadge active={isActive}>
              {isActive ? "Active" : "Inactive"}
            </StatusBadge>
          }
        />

        <DetailRow
          label="User Role"
          value={capitalizeFirstLetter(user?.role) || "User"}
        />

        <DetailRow
          label="Subscription Plan"
          value={
            <span className="capitalize">
              {user?.subscription?.plan || "Free"}
            </span>
          }
        />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-7 dark:border-[#112a46]">
        <SectionTitle
          icon={SlidersHorizontal}
          title="Preferences"
        />

        <div className="space-y-5">
          <DetailRow
            label="Preferred Language"
            value={user?.language || "English"}
          />

          <DetailRow
            label="Add to watchlist notification"
            value={
              <BooleanValue
                value={user?.watchlistUpdateNotification}
              />
            }
          />

          <DetailRow
            label="Add to favorites notification"
            value={
              <BooleanValue
                value={user?.favoritesUpdateNotification}
              />
            }
          />

          <DetailRow
            label="New movie notification"
            value={
              <BooleanValue
                value={user?.newMovieReleaseNotification}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;