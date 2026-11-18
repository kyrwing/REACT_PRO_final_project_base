import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../../shared/assets/icons/like.svg';
import classNames from 'classnames';

type LikeButtonProps = {
	isLike: boolean;
	onToggleLike: () => void;
	disabled?: boolean;
};

export const LikeButton = ({
	isLike,
	onToggleLike,
	disabled,
}: LikeButtonProps) => {
	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={onToggleLike}
			disabled={disabled}>
			<LikeSvg />
		</button>
	);
};
