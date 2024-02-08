"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "./commentSection.module.css";
import ItemComment from "./ItemComment";
import { useGetComments } from "@/lib/react-query/reactQueriesAndMutations";
import CommentModal from "./CommentModal";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function CommentSection() {
  const { data: comments, isPending: isLoadingComments } = useGetComments();

  const { user, isLoading, setUser } = useAuthContext();

  return (
    <section className={styled.comment}>
      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={528}
        height={564}
        className={styled.comment__sheet_rigth}
      />

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={544}
        height={581}
        className={styled.comment__sheet_left}
      />

      <h2 className={styled.comment__title}>ОТЗЫВЫ</h2>

      {!isLoadingComments ? (
        <div className={styled.comment__slider}>
          {comments?.length ? (
            <Slider {...settings}>
              {comments.map((item, key) => (
                <ItemComment key={key} comment={item} />
              ))}

              <ItemComment
                key={1}
                comment={{ name: "Вася", comment: "Очень хорошие цветы" }}
              />
              <ItemComment
                key={2}
                comment={{ name: "Дима", comment: "Магазин очень цветочный" }}
              />
            </Slider>
          ) : (
            "Нету комментариев"
          )}
        </div>
      ) : (
        <div className={styled.comment__slider}>Загрузка комментариев...</div>
      )}

      <CommentModal myComment={comments} user={user} setUser={setUser}>
        {!isLoading ? (
          <button
            className={styled.comment__button}
          >
            ОСТАВИТЬ ОТЗЫВ
          </button>
        ) : (
          ""
        )}
      </CommentModal>
    </section>
  );
}

export default CommentSection;
