import z from "zod"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const signUpSchema = (minPasswordLength = 8) => z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "please enter your fullname"),

  email: z
    .string()
    .trim()
    .min(1, "please enter your email.")
    .refine((value) => EMAIL_RE.test(value), {
      error: "email format is not correct"
    }),

  password: z
    .string()
    .trim()
    .min(1, "please enter your password")
    .regex(/\d/, "Password must contain at least one number")
    .min(minPasswordLength,` password must be have at least ${minPasswordLength} characters `)

  ,
  confirmPassword: z
    .string()
    .trim()
    .min(1, "please enter your password again"),
  isPolicyAccepted: z.
    boolean()
    .refine((value) => value === true, {
      error: "You must accept the Terms of Use & Privacy Policy"
    })
})
  .refine((data) => data.password === data.confirmPassword, {
    error: "passwords do not match",
    path: ["confirmPassword"]
  })


export const addNewUserSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "please enter user fullname"),

  email: z
    .string()
    .trim()
    .min(1, "please enter user email.")
    .refine((value) => EMAIL_RE.test(value), {
      error: "email format is not correct"
    }),

  password: z
    .string()
    .trim()
    .min(1, "please enter user password")
    .regex(/\d/, "Password must contain at least one number")
    .min(8, "password must be have atleast 8 characters ")

  ,
  confirmPassword: z
    .string()
    .trim()
    .min(1, "please enter user password again"),

})
  .refine((data) => data.password === data.confirmPassword, {
    error: "passwords do not match",
    path: ["confirmPassword"]
  })

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "please enter your email.")
    .refine((value) => EMAIL_RE.test(value), {
      error: "email format is not correct"
    }),

  password: z
    .string()
    .trim()
    .min(1, "please enter your password")
    .min(8, "password must be have at least 8 characters ")
  ,
})

export const profileEditSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "please enter your fullname"),

  email: z
    .string()
    .trim()
    .min(1, "please enter your email.")
    .refine((value) => EMAIL_RE.test(value), {
      error: "email format is not correct"
    }),

  bio: z
    .string()
    .trim()
    .min(8, "please enter a complete bio about yourself")
})

export const changePasswordSchema = z.object({

  currentPassword: z.
    string()
    .trim()
    .min(1, "please enter your current password"),

  newPassword: z
    .string()
    .trim()
    .regex(/\d/, "Password must contain at least one number")
    .min(1, "please enter your password")
    .min(8, "password must be have atleast 8 characters "),

  confirmNewPassword: z
    .string()
    .trim()
    .min(1, "please enter your password again"),
})
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "passwords do not match",
    path: ["confirmNewPassword"]
  })

export const editUserInformation = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "please enter user fullname"),

  email: z
    .string()
    .trim()
    .min(1, "please enter user email.")
    .refine((value) => EMAIL_RE.test(value), {
      error: "email format is not correct"
    }),
})

const requiredString = (message) =>
  z.string().trim().min(1, message);

export const bugTicketSchema = z.object({
  subject: requiredString("Please enter a subject."),
  description: requiredString("Please enter a description."),
  stepsToReproduce: requiredString("Please describe the steps to reproduce."),
  expectedBehavior: requiredString("Please enter the expected behavior."),
  actualBehavior: requiredString("Please enter the actual behavior."),
  affectedPage: requiredString("Please select an affected page."),
});

export const improvementTicketSchema = z.object({
  subject: requiredString("Please enter a subject."),
  description: requiredString("Please enter a description."),
  proposedImprovement: requiredString(
    "Please describe your proposed improvement."
  ),
});

export const featureTicketSchema = z.object({
  subject: requiredString("Please enter a feature title."),
  description: requiredString("Please enter a description."),
  problemToSolve: requiredString(
    "Please describe the problem this feature would solve."
  ),
});

export const accountTicketSchema = z.object({
  subject: requiredString("Please enter a subject."),
  description: requiredString("Please enter a description."),
});


export function getZodErrors(schema, values) {
  const result = schema.safeParse(values);

  const errors = {};

  // Create an empty error array for every input
  for (const key of Object.keys(values)) {
    errors[key] = [];
  }

  if (result.success) return errors;

  for (const issue of result.error.issues) {
    const key = issue.path[0];

    if (!key) continue;

    // Make sure the key exists before push()
    if (!errors[key]) {
      errors[key] = [];
    }

    errors[key].push(issue.message);
  }

  return errors;
}