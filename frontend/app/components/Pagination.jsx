'use client'
import React, { useEffect, useState } from 'react';
import { Pagination } from '@cogoport/components';

const PaginationComponent = ({ currentPage, totalItems , pageSize, onPageChange}) => {
    return (
        <div>
            <Pagination
                type="number"
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </div>
    )
}

export default PaginationComponent




