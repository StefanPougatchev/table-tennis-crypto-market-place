import { Skeleton } from './ui/skeleton';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

const SkeletonCard = () => {
	return (
		<Card className='flex flex-col h-full'>
			<CardHeader className='space-y-2'>
				<Skeleton className='h-6 w-[250px]' />

				<Skeleton className='h-4 w-[180px]' />
			</CardHeader>
			<CardContent className='flex-grow space-y-4'>
				<Skeleton className='w-48 h-48' />

				<Skeleton className='h-6 w-24' />
			</CardContent>
			<CardFooter className='mt-auto'>
				<Skeleton className='w-full h-10' />
			</CardFooter>
		</Card>
	);
};

export default SkeletonCard;
