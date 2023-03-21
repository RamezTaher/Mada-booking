import React from "react"
import classnames from "classnames"
import { usePagination, DOTS } from "../hooks/usePagination"
import { nanoid } from "nanoid"
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <button
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <i className="icon-chevron_right_black_24dp-1" />
      </button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={nanoid()} className="pagination-item dots">
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={nanoid()}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      <button
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <i className="icon-chevron_left_black_24dp-1" />
      </button>
    </ul>
  )
}

export default Pagination
