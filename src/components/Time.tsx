import React from "react";

type TimeProps = {
  date: string;
};

const Time: React.FC<TimeProps> = ({ date }) => {
  const formatDate = (date: string): string => {
    const targetDate: Date = new Date(date);
    const currentDate: Date = new Date();
    const timeDiff: number = currentDate.getTime() - targetDate.getTime();
    const elapsedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const elapsedHours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const elapsedMinutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    if (elapsedDays > 0) {
      return `${elapsedDays} დღის წინ`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours} საათის წინ`;
    } else {
      return `${elapsedMinutes} წუთის წინ`;
    }

    // return -daysDifference;
  };
  return (
    <div className="d-flex align-items-center time">
      <div>{formatDate(date)}</div>
    </div>
  );
};

export default Time;
