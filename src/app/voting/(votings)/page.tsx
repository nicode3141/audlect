import React from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import Image from "next/image";
import VotingCard from "~/features/votings/VotingCard/VotingCard";
import VotingItems from "~/features/votings/VotingItems/VotingItems";
import VotingsPageLayout from "~/components/layout/VotingsPageLayout/VotingsPageLayout";

export default function page() {
	return <VotingsPageLayout />;
}
