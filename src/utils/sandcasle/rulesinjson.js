module.exports.adminperms = function adminperms(user = null) {
  return [
    {
      action: "manage",
      subject: ["Article"],
    },

    {
      action: ["update", "read"],
      subject: "User",
      fields: ["name", "password", "avatar"],
      conditions: { _id: user._id },
    },
    { action: "read", subject: "User", fields: ["abb"] },
  ];
};

module.exports.userperms = function userperms(user) {
  return [
    {
      action: ["read", "create", "update", "delete"],
      subject: "Article",
      fields: [
        "name",
        "ISBN",
        "categories",
        "basis_fornegotioations",
        "private",
        "owner",
      ],
      conditions: { private: false, _id: user._id },
    },
    {
      action: ["read"],
      subject: "Article",
      fields: [
        "name",
        "ISBN",
        "categories",
        "basis_fornegotioations",
        "private",
        "owner",
      ],
      conditions: { private: false, _id: user._id },
    },
    {
      action: "read",
      subject: "User",
      fields: ["name", "Articles", "abb"],
      conditions: { private: false, _id: user._id },
    },
  ];
};
