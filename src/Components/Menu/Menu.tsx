import type { MenuItem } from '../../utils/data-types';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

type MenuProps = {
	toggleMenu: () => void;
	onSelect: (menuItemPath: string) => void;
	menuItems: MenuItem[];
};

export const ExternalIcon = () => {
	return <FaExternalLinkAlt size={10} />;
};

export const Menu = ({ onSelect, toggleMenu, menuItems }: MenuProps) => {
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Trigger the animation shortly after the component mounts
		const timer = setTimeout(() => setIsAnimating(true), 10);
		return () => clearTimeout(timer);
	}, []);

	const menuItemsList = menuItems.map((menuItem, index) => (
		<li
			key={menuItem.title}
			className={`ml-2 mb-2 md:mb-4 cursor-pointer ${isAnimating ? 'menu-item-enter' : ''}`}
			style={{
				opacity: 0,
				transform: 'translateX(-100%)',
				animationDelay: `${index * 0.1}s`,
			}}
			onClick={() => onSelect(menuItem.path)}>
			<div className='flex gap-2 md:gap-4 items-center border-hover border border-zinc-900 hover:border-yellow-400 bg-black rounded-sm transition ease-in-out gradient-hover p-3'>
				<span className='text-yellow-400 my-1 mx-2 ml-2'>{menuItem.icon}</span>
				<span className='text-menuItem'>{menuItem.title}</span>
				<div className='ml-2 mr-4'>{menuItem.isExternal && <ExternalIcon />}</div>
			</div>
		</li>
	));

	return (
		<div
			className='flex flex-col my-24 mx-10 justify-center items-center h-full'
			onClick={toggleMenu}>
			<ul className='flex flex-col h-max-fit gap-2 md:gap-0 mt-2 md:text-username text-sm'>{menuItemsList}</ul>
		</div>
	);
};
