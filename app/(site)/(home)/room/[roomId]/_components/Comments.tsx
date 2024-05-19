"use client";

import { ChangeEvent, useState } from "react";
import { BsDot } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { IComment, IPostComment, IRoomId } from "@/interface";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "@/actinos";
import { IoIosSend } from "react-icons/io";

export default function Comments({
  roomId,
  room,
  refetchFunc,
}: {
  roomId: string;
  room: IRoomId;
  refetchFunc: () => void;
}) {
  const [commentData, setCommentData] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["comment_post"],
    mutationFn: (data: IPostComment) => postComment(data),
    onSuccess(res) {
      if (res.data) {
        refetchFunc();
        setTimeout(() => {
          const elm = document.querySelector("#comments");
          elm?.scrollTo({
            left: 0,
            behavior: "smooth",
            top: elm.scrollHeight,
          });
        }, 1000);
      }
    },
  });

  const sendComment = () => {
    if (commentData.trim()) mutate({ text: commentData, restaurant: +roomId });
    setCommentData("");
  };

  return (
    <>
      <div className="w-full xl:w-2/3 pr-0 xl:pr-24 ">
        <h3 className="font-semibold text-2xl mb-6">Comments</h3>
        {room && (
          <div className="">
            <div
              className="w-full !h-[300px] md:!h-[620px] overflow-y-scroll"
              id="comments"
            >
              {room.comments.length ? (
                <>
                  {room.comments.reverse().map((item: IComment, i: number) => (
                    <div key={item.id}>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={item.user.image}
                              alt={item.user.username}
                              className="cursor-pointer w-12 h-12 object-cover"
                            />
                            <AvatarFallback>
                              {item.user.username.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium tracking-wide">
                            {item.user.username}
                          </span>
                          <BsDot />
                          <span className="text-black/70">
                            {item.created_at}
                          </span>
                        </div>
                        <p className="w-full xl:w-4/5 text-black/70">
                          {item.text}
                        </p>
                      </div>
                      {i !== room.comments.length - 1 && (
                        <Separator className="my-4 w-[95%]" />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex justify-center items-center w-full h-full bg-gray-100">
                  <p>There are no comments</p>
                </div>
              )}
            </div>
            <div className="flex mt-4 gap-2">
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCommentData(e.target.value)
                }
                value={commentData}
                placeholder="Leave a comment"
                className="focus-visible:ring-offset-0 focus-visible:ring-current"
              />
              <Button
                disabled={isPending}
                onClick={sendComment}
                className="bg-current hover:bg-current/90 transition-colors"
              >
                Send <IoIosSend className="text-white ml-2 text-[18px]" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
