import food from '../../assets/food.jpg'
import Image from 'next/image'
import Food from '../../assets/food.png'
import Food1 from '../../assets/food1.png'
import Food2 from '../../assets/food2.png'
import Food3 from '../../assets/food3.png'
import Food4 from '../../assets/food4.png'
import Food5 from '../../assets/food5.png'
import Food6 from '../../assets/food6.jpg'
import Food7 from '../../assets/food7.png' 
import chef from '../../assets/chef.jpg' 
import { BsPeople } from 'react-icons/bs'

export default function AboutSection(){
    return(
        <>
            <section className='my-12 px-4 sm:my-16 sm:px-6 lg:my-20 lg:px-15 text-[#0a0a0a]'>
                <div className='mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16'>
                    <div className='w-full lg:w-[48%]'>
                        <Image src={food} alt='Signature dish' className='h-auto w-full rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.08)]' />
                    </div>

                    <div className='flex w-full flex-col items-center gap-6 text-center lg:w-[52%] lg:items-start lg:text-left'>
                        <span className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>Experience dining beyond expectations</span>
                        <p className='max-w-xl text-sm leading-7 text-[#3a3a3a] sm:text-base'>We combine fresh local ingredients, creative recipes and elegant presentation to deliver a memorable experience with every visit.</p>
                        <div className='w-full max-w-xs lg:max-w-sm'>
                            <Image src={food} alt='Dining experience' className='h-auto w-full rounded-[2rem]' />
                        </div>
                    </div>
                </div>

                <div className='mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 xl:grid-cols-3'>
                    <div className='text-center'>
                        <span className='block text-5xl font-bold sm:text-6xl'>0.1</span>
                        <p className='py-4 text-2xl font-semibold sm:text-3xl'>Premium Ingredients</p>
                        <p className='google mx-auto max-w-sm text-sm leading-7 text-[#4b4b4b] sm:text-base'>We carefully source the freshest ingredients to create dishes full of authentic flavor.</p>
                    </div>

                    <div className='text-center'>
                        <span className='block text-5xl font-bold sm:text-6xl'>0.2</span>
                        <p className='py-4 text-2xl font-semibold sm:text-3xl'>Chef&apos;s Expertise</p>
                        <p className='google mx-auto max-w-sm text-sm leading-7 text-[#4b4b4b] sm:text-base'>Every recipe is prepared with precision, creativity, and years of culinary experience.</p>
                    </div>

                    <div className='text-center sm:col-span-2 xl:col-span-1'>
                        <span className='block text-5xl font-bold sm:text-6xl'>0.3</span>
                        <p className='py-4 text-2xl font-semibold sm:text-3xl'>Warm Hospitality</p>
                        <p className='google mx-auto max-w-sm text-sm leading-7 text-[#4b4b4b] sm:text-base'>Our dedicated team ensures every guest enjoys exceptional service from start to finish.</p>
                    </div>
                </div>
            </section>

            <section className='my-14 px-4 text-[#111111] sm:my-16 sm:px-6 lg:my-20 lg:px-15'>
                <div className='mx-auto max-w-6xl'>
                    <span className='block text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#CA2851] sm:text-base'>Chef&apos;s Signature Selection</span>
                    <p className='py-6 text-center text-3xl font-semibold sm:text-4xl lg:text-5xl'>Discover our signature dishes</p>

                    <div className='relative mx-auto mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4'>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food} alt='Italiano pizza' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Italiano pizza</span>
                            <p className='google text-sm sm:text-base'>35$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food1} alt='Espano pizza' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Espano pizza</span>
                            <p className='google text-sm sm:text-base'>39$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food2} alt='Hummus' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Hummus</span>
                            <p className='google text-sm sm:text-base'>23$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food3} alt='Chicken' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Chicken</span>
                            <p className='google text-sm sm:text-base'>44$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food4} alt='Hamburger' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Hamburger</span>
                            <p className='google text-sm sm:text-base'>13$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 mt-8 text-center'>
                            <Image src={Food5} alt='Sandwich' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Sandwich</span>
                            <p className='google text-sm sm:text-base'>19$</p>
                        </div>
                        <div className='flex flex-col items-center gap-3 text-center'>
                            <Image src={Food6} alt='Pizza' className='w-28 rounded-full border object-cover sm:w-32'/>
                            <span className='text-base sm:text-lg'>Pizza</span>
                            <p className='google text-sm sm:text-base'>38$</p>
                        </div>
                        <div className='flex flex-col items-center gap-5 mt-6 text-center'>
                            <Image src={Food7} alt='Hummus bowl' className='w-28 sm:w-32'/>
                            <span className='text-base sm:text-lg'>Hummus</span>
                            <p className='google text-sm sm:text-base'>23$</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mx-auto my-14 px-4 text-[#111111] sm:my-16 sm:px-6 lg:my-20 lg:px-15'>
                <div className='mx-auto max-w-6xl'>
                    <span className='block text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#CA2851] sm:text-base'>What Sets Us Apart</span>
                    <span className='mx-auto my-5 block max-w-3xl text-center text-3xl font-semibold sm:text-4xl lg:text-5xl'>Crafting memorable dining experiences</span>

                    <div className='mt-20 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]'>
                        <div className='flex flex-col gap-7 w-96 text-center mt-10'>
                            <div className='space-y-3 pb-8'>
                                <div className='flex gap-5'>
                                    <BsPeople className='text-[#CA2851] h-8 w-8'/>
                                    <span className='text-xl font-semibold sm:text-2xl'>Chef-Crafted Dishes</span>
                                </div>
                                <span className='block text-sm leading-7 text-[#4b4b4b] sm:text-base'>Every dish is prepared by expert chefs using authentic recipes and premium ingredients.</span>
                            </div>

                            <div className='space-y-3 pb-8'>
                                <div className='flex gap-5'> 
                                    <BsPeople className='text-[#CA2851] h-8 w-8'/>
                                    <span className='text-xl font-semibold sm:text-2xl'>Farm Fresh Ingredients</span>
                                </div>
                                <span className='block text-sm leading-7 text-[#4b4b4b] sm:text-base'>We source fresh, seasonal ingredients daily to deliver exceptional flavor and quality in every meal.</span>
                            </div>

                            <div className='space-y-3 pb-12'>
                                <div className='flex gap-5'>
                                    <BsPeople className='text-[#CA2851] h-8 w-8'/>
                                    <span className='text-xl font-semibold sm:text-2xl'>Warm Hospitality</span>
                                </div>
                                <span className='block text-sm leading-7 text-[#4b4b4b] sm:text-base'>Enjoy attentive service and a welcoming atmosphere that makes every visit comfortable and memorable.</span>
                            </div>

                            <div className='flex justify-center items-center'>
                                <button className='cursor-pointer rounded-sm bg-[#CA2851] text-white py-3 px-10 md:px-12 md:py-4'>book a table</button>
                            </div>
                        </div>

                        <div className='mx-auto w-full max-w-xl'>
                            <Image src={chef} alt='chef' className='h-160 w-full rounded-[1.5rem] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.08)]' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
