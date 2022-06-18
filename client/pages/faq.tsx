import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import useLanguage from '../hooks/useLanguage';

function FAQItem({
	question,
	answer,
	defaultShowAnswer,
}: {
	question: string;
	answer: string;
	defaultShowAnswer: boolean;
}): JSX.Element {
	const [showAnswer, setShowAnswer] = useState(defaultShowAnswer);
	const Icon = showAnswer ? ChevronUpIcon : ChevronDownIcon;
	const wrapperRef = useRef<HTMLDivElement>(null);
	const growRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showAnswer) {
			growRef.current!.style.height = `${wrapperRef.current!.clientHeight}px`;
		} else {
			growRef.current!.style.height = '0px';
		}
	}, [showAnswer]);

	return (
		<li className='py-4 border-t border-color'>
			<div className='flex items-center justify-between'>
				<h2 className='text-lg md:text-xl text-text_primary dark:text-d_text_title mb-2'>
					{question}
				</h2>
				<Icon
					className='w-6 text-gray-500 dark:text-gray-400 cursor-pointer'
					onClick={() => setShowAnswer(!showAnswer)}
				/>
			</div>

			<div
				ref={growRef}
				className='transition-[height] duration-300 overflow-hidden'
			>
				<div ref={wrapperRef}>
					<p className='text-gray-500 dark:text-gray-400'>{answer}</p>
				</div>
			</div>
		</li>
	);
}

const FAQs: NextPage = () => {
	const lang = useLanguage();
	const faqLang = lang.pages.faq;
	const faqs = lang.faqs;

	return (
		<div className='max-w-4xl px-4 my-4 md:my-8 mx-auto'>
			<h1 className='text-center mb-3 md:mb-6 font-semibold'>
				{faqLang.title}
			</h1>
			<ul className='grid grid-cols-1 gap-2 md:gap-4'>
				{faqs.map((faq, index) => (
					<FAQItem
						defaultShowAnswer={!index}
						question={faq.question}
						answer={faq.answer}
					/>
				))}
			</ul>
		</div>
	);
};

export default FAQs;
