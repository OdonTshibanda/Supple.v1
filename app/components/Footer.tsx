import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import Link from "next/link";
export default function Footer () {
    return (
        <div className='pt-20 px-6 md:px-16 lg:px-24 xl:px-32 text-[#111111]'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                     <a href="#" className="supple mb-4 h-8 md:h-9" >Supple</a> 
                    <p className='text-sm'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text
                    </p>
                    <div className='flex items-center gap-x-10 mt-4'>
                        <BsFacebook/>
                        <BsInstagram/>
                        <BsYoutube/>
                        <BsTwitterX/>
                    </div>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>LINKS</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/about'}>About</Link></li>
                        <li><Link href={'/'}>Dishes</Link></li>
                        <li><Link href={'/faqs'}>Faqs</Link></li>
                        <li><Link href={'/contact'}>Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Accessibility</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-lg text-gray-800'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                        <button className='flex items-center justify-center bg-[#CA2851] h-9 w-9 aspect-square rounded-r'>
                            {/* Arrow icon */}
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="#" className="supple">Supple</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms of Service</a></li> 
                </ul>
            </div>
        </div>
    );
};
