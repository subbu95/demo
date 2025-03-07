interface RequestParams {
    coucode: string;       // Country code (e.g., "IT" for Italy)
    monStartDate: string;  // Start date in YYYY-MM-DD format
    orderBy: string;       // Ordering field (if applicable)
    pageNumber: number;    // Current page number for pagination
    pageSize: number;      // Number of results per page
    sortBy: string;        // Sorting criteria

    [key: string]: string | number; // Dynamic key-value pairs
}