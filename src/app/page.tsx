'use client';

import { useConnect, useAccount, useBalance } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { sepolia } from 'viem/chains';
import { formatUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const USDT_CONTRACT_ADDRESS = '0x064b057f7c1fe0b54becaa253de9260e6a95c858';

export const formatBalance = (balance): string => {
	if (!balance) return '0.00';
	return `${Number(formatUnits(balance.value, balance.decimals)).toFixed(2)} ${
		balance.symbol
	}`;
};

export default function Home() {
	const { address } = useAccount();
	const { connectAsync } = useConnect();
	const router = useRouter();

	const { data: balance } = useBalance({
		address: address,
		token: USDT_CONTRACT_ADDRESS,
		chainId: sepolia.id,
	});

	const handleConnect = async () => {
		try {
			await connectAsync({ chainId: sepolia.id, connector: injected() });
		} catch (error) {
			console.error(error);
		}
	};

	if (!address) {
		return (
			<main className='px-4 py-8'>
				<Button onClick={handleConnect}>Connect Wallet</Button>
			</main>
		);
	} else {
		return (
			<main className='px-4 py-8'>
				<p className='text-lg font-medium'>Balance: {formatBalance(balance)}</p>

				<Button
					onClick={() => router.push('/blades')}
					size='lg'
				>
					View Blades
				</Button>
			</main>
		);
	}
}
