'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConnect, useAccount, useWriteContract, useBalance } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { sepolia } from 'viem/chains';
import { parseUnits } from 'viem';
import { formatBalance } from '@/app/page';

const USDT_CONTRACT_ADDRESS = '0x064b057f7c1fe0b54becaa253de9260e6a95c858';
const RECIPIENT_ADDRESS = '0x12e410e27B80961FF71a2e6AaC359CC35A82c9c1';

interface PayButtonProps {
	price: number;
	children?: React.ReactNode;
	className?: string;
}

export const PayButton = ({ price }: PayButtonProps) => {
	const { connectAsync } = useConnect();
	const { address } = useAccount();
	const { writeContractAsync } = useWriteContract();
	const [started, setStarted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [completed, setCompleted] = useState(false);

	const { data: senderBalance } = useBalance({
		address: address,
		token: USDT_CONTRACT_ADDRESS,
		chainId: sepolia.id,
	});

	const { data: recipientBalance } = useBalance({
		address: RECIPIENT_ADDRESS,
		token: USDT_CONTRACT_ADDRESS,
		chainId: sepolia.id,
	});

	console.log('senderBalance:', senderBalance);
	console.log('recipientBalance:', recipientBalance);

	const handlePayment = async () => {
		try {
			setError(null);
			setStarted(true);

			if (!address) {
				await connectAsync({ chainId: sepolia.id, connector: injected() });
			}

			const amount = parseUnits(price.toString(), 6);

			const data = await writeContractAsync({
				chainId: sepolia.id,
				address: USDT_CONTRACT_ADDRESS,
				functionName: 'transfer',
				abi: [
					{
						inputs: [
							{ internalType: 'address', name: 'recipient', type: 'address' },
							{ internalType: 'uint256', name: 'amount', type: 'uint256' },
						],
						name: 'transfer',
						outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
						stateMutability: 'nonpayable',
						type: 'function',
					},
				],
				args: [RECIPIENT_ADDRESS, amount],
			});

			console.log('Transaction:', data);
			setCompleted(true);
		} catch (err) {
			setError('Payment failed. Please try again');
			setStarted(false);
			console.error(err);
		} finally {
			setStarted(false);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			{!completed && (
				<>
					{senderBalance && (
						<div className='text-sm'>
							Your Balance: {formatBalance(senderBalance)}
						</div>
					)}
					<Button
						onClick={handlePayment}
						disabled={
							started ||
							(senderBalance &&
								parseFloat(formatBalance(senderBalance)) < price)
						}
					>
						{started ? 'Processing...' : `Pay ${price} tUSDT`}
					</Button>
					{senderBalance &&
						parseFloat(formatBalance(senderBalance)) < price && (
							<p className='text-red-500 text-sm'>Insufficient USDT balance</p>
						)}
				</>
			)}
			{completed && (
				<div className='text-green-500'>Payment completed successfully</div>
			)}
			{error && <p className='text-red-500'>{error}</p>}
		</div>
	);
};
