import { Types } from "connectkit";
import Image from "next/image";
import santa1 from "../../public/icons8-santa-claus-96.png";
import santawhite1 from "../../public/santa.png";

const CustomAvatar = ({
  address,
  ensImage,
  ensName,
  size,
}: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: 0,
        height: size,
        width: size,
        // background: generateColorFromAddress(address), // your function here
      }}
    >
      {
        <Image
          src={santawhite1}
          alt={ensName ?? address}
          width="100%"
          height="100%"
        />
      }
    </div>
  );
};

export default CustomAvatar;
