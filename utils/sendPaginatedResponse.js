const sendPaginatedResponse = (
  res,
  data,
  totalCount,
  page,
  limit,
  message = "Fetched successfully"
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    },
  });
};

export default sendPaginatedResponse;
