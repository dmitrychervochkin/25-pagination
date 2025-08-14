import { ChevronLeft, ChevronRight } from "lucide-react";
import "./pagination.scss";
import { useState } from "react";

interface PaginationProps {
    count: number;
    onClick?: (page: number) => void;
}

export const Pagination = ({ count, onClick }: PaginationProps) => {
    const [current, setCurrent] = useState(0);

    const getVisiblePages = (total: number, currentPage: number) => {
        const pages: (number | string)[] = [];

        if (total <= 9) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        if (currentPage <= 5) {
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push("...");
            pages.push(total);
            return pages;
        }

        if (currentPage >= total - 4) {
            pages.push(1);
            pages.push("...");
            for (let i = total - 6; i <= total; i++) {
                pages.push(i);
            }
            return pages;
        }

        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i);
        }
        pages.push("...");
        pages.push(total);

        return pages;
    };

    const onItemClicked = (id: number) => {
        setCurrent(id);
        onClick?.(id);
    };

    const onLeftClicked = () => {
        if (current > 0) setCurrent((prev) => prev - 1);
    };
    const onRightClicked = () => {
        if (current < count - 1) setCurrent((prev) => prev + 1);
    };

    return (
        <div className="pagination">
            <ChevronLeft
                className={`left-btn ${current === 0 ? "disabled" : ""}`}
                size="30px"
                strokeWidth={2}
                onClick={onLeftClicked}
            />
            {getVisiblePages(count, current + 1).map((p, idx) =>
                p === "..." ? (
                    <div key={idx} className="dots">
                        ...
                    </div>
                ) : (
                    <div
                        key={idx}
                        className={`item ${current + 1 === p ? "current" : ""}`}
                        onClick={() => onItemClicked((p as number) - 1)}
                    >
                        {p}
                    </div>
                )
            )}
            <ChevronRight
                className={`right-btn ${
                    current === count - 1 ? "disabled" : ""
                }`}
                size="30px"
                strokeWidth={2}
                onClick={onRightClicked}
            />
        </div>
    );
};
