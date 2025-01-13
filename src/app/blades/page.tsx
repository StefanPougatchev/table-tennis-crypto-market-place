import { Product } from '@/types/types';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PayButton } from '@/components/PayButton';

async function getProducts(): Promise<Product[]> {
	const response = await fetch('http://localhost:4000/items');
	const data = await response.json();
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return data;
}

export default async function Home() {
	const products = await getProducts();
	return (
		<main className='px-4 py-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product) => (
					<Card
						key={product.internalid}
						className='flex flex-col h-full'
					>
						<CardHeader>
							<CardTitle>{product.displayname}</CardTitle>
							<CardDescription>{`Product Number: ${product.internalid}`}</CardDescription>
						</CardHeader>
						<CardContent className='flex-grow'>
							<img
								src={product.itemimages_detail.main.url}
								alt={product.itemimages_detail.main.altimagetext}
								className='w-48 h-48'
							/>
							<p>
								{
									product.onlinecustomerprice_detail
										.onlinecustomerprice_formatted
								}
							</p>
						</CardContent>
						<CardFooter className='mt-auto'>
							<PayButton
								price={product.onlinecustomerprice}
								className='w-full'
							>
								Buy Now
							</PayButton>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
