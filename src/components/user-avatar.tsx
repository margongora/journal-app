import Image from "next/image";
import { auth } from "../auth";

export default async function UserAvatar() {
	const session = await auth();

	return (
		<div>
			<Image src={session!.user!.image as string} alt='User Avatar' width='100' height='100'></Image>

		</div>
	)
}