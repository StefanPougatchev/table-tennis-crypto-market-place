import SkeletonCard from '@/components/SkeletonCard';
export default function Loading() {
	return (
		<main className='px-4 py-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		</main>
	);
}
