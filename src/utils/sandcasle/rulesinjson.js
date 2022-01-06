module.exports.adminperms = function adminperms(user = null) {
  return [
    {
      action: "manage",
      subject: ["Article", "Tasks"],
    },

    {
      action: ["update", "read"],
      subject: "User",
      fields: ["name", "password", "avatar"],
      conditions: { _id: user._id },
    },
  ];
};

module.exports.userperms = function userperms(user) {
  return [
    {
      action: "read",
      subject: "Article",
      fields: [
        "name",
        "ISBN",
        "categories",
        "basis_fornegotioations",
        "private",
        "owner",
      ],
      conditions: { private: false },
    },
    {
      action: read,
      subject: "User",
      fields: ["name", "Articles"],
      conditions: { private: false },
    },
  ];
};
