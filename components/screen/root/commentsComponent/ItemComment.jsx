import styled from "./itemComment.module.css";

function ItemComment({ comment }) {
  return (
    <div className={styled.item}>
      <div className={styled.item__wrapper}>
        <div className={styled.item__calc}>
          <img
            src="/icons/profile.svg"
            alt="profile"
            width={50}
            height={50}
            className={styled.item__profile}
          />
        </div>
        <p className={styled.item__name}>{comment.name}</p>
      </div>
      <div className={styled.item__comment}>{comment.comment}</div>
    </div>
  );
}

export default ItemComment;
