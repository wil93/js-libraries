import { type SyncUser, type User, userPictureUrl } from "@olinfo/training-api";
import clsx from "clsx";

type Props = {
  user: User | SyncUser;
  size: number;
  className?: string;
};

export function Avatar({ user, size, className }: Props) {
  const url = "picture" in user ? user.picture : userPictureUrl(user);

  return (
    <div className={clsx("avatar max-h-full max-w-full", className)}>
      <div className="rounded" style={{ width: size, height: size }}>
        <img
          src={`${url}&s=${size}`}
          srcSet={[1, 2, 3].map((m) => `${url}&s=${size * m} ${m}x`).join(", ")}
          width={size}
          height={size}
          alt={`Foto profilo di ${user.username}`}
          className="skeleton rounded-none"
        />
      </div>
    </div>
  );
}
