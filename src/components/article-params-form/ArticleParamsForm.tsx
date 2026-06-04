import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	currentAppState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentAppState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentAppState);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsOpen((prev) => {
			const nextOpen = !prev;
			if (!nextOpen) {
				setFormState(currentAppState);
			}
			return nextOpen;
		});
	};

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: (newValue) => {
			setIsOpen(newValue);
			if (!newValue) {
				setFormState(currentAppState);
			}
		},
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleMenu} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
					/>

					<div style={{ opacity: 0.15 }}>
						<Separator />
					</div>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
