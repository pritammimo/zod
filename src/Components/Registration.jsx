/* eslint-disable no-unused-vars */
import { z } from "zod";
import { useFieldArray, useForm} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
const Registration = () => {
  const baseCategorySchema = 
    z.tuple([
      z.string().min(10,{message:"Phone Number can't be less than 10 Character"}),
      z.string().optional(),
    ])
    const socialSchema = z.object({
      twitter: z.string().optional(),
      facebook: z.string().optional(),
    });
    const CouponcodeSchema = z.array(z.object({
      number: z.string().min(1,{message:"Coupon Code can't be less than 1 digit"}),
    }));
    // z.string().min(10,{message:"Phone Number Can't be less than 10 Character"}),z.string().min(5,{message:"Phone num"})
    
    const schema=z.object({
        FirstName:z.string().min(2,{ message: "Firstname can't be less than 2 character" }).max(10,
    { message: "Firstname can't be more than 10 character" }
            ),
        LastName:z.string().optional(),
        Email:z.string().min(1,{message:"Email can't be empty"}).email({message:"must be a valid email"}),
        Age:z.number().min(18,{message:"Age must be greater than 18"}).max(70,{
            message:"Age must be less than 80"
        }),
        Password:z.string().min(8,{message:"Password must be greater than 7 digits"}).max(10,{
            message:"Password must be less than 10 digits"
        }),
        PhoneNumber:baseCategorySchema,
        social:socialSchema,
        CouponCode:CouponcodeSchema,
        ConfirmPassword:z.string().min(8).max(10),
        Terms:z.literal(true,{
            errorMap: () => ({ message: "You must accept Terms and Conditions" }),
          })
    })
    .superRefine((data,ctx)=>{
      if(data.ConfirmPassword!==data.Password){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path:["ConfirmPassword"],
          message: `Confirm Password Should be same as password`,
        });
      }
      if(data.Email?.includes("@yopmail")){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path:["Email"],
          message: `Yopmail not supported`,
        });
      }
    })
    // .refine((data)=>data.Password===data.ConfirmPassword,{
    //     message:"Password do not match",
    //     path:["ConfirmPassword"]
    // })
    const {register,control,handleSubmit,formState,watch,getValues,setValue,setError}=useForm(
        {
        resolver:zodResolver(schema),
        defaultValues:{
          FirstName:"Pritam",
          LastName:"Saha",
          Email:"crpritamSaha@gmail.com",
          Age:0,
          Password:"",
          PhoneNumber:["",""],
          social:{
            twitter:"",
            facebook:""
          },
          CouponCode:[{
            number:""
          }],
          ConfirmPassword:"",
        }
    })
    const {errors}=formState
    console.log("errors",errors);
    const onSubmit=(data)=>{
          console.log("data",data);
       }
       const {fields,append,remove}=useFieldArray({
        name:"CouponCode",
        control
      })
  return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section
      className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="Night"
        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="/">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Squid 🦑
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
            href="/"
          >
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <h1
            className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Welcome to Squid 🦑
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              {...register("FirstName")}
            />
              <p className="text-red-700">{errors?.FirstName?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              {...register("LastName")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          <p className="text-red-700">{errors?.LastName?.message}</p>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              id="Email"
              {...register("Email")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          <p className="text-red-700">{errors?.Email?.message}</p>

          </div>
          
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Age" className="block text-sm font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              id="Age"
              {...register("Age",{valueAsNumber:true})}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          <p className="text-red-700">{errors?.Age?.message}</p>

          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter
            </label>

            <input
              type="text"
              id="twitter"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              {...register("social.twitter")}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="facebook"
              className="block text-sm font-medium text-gray-700"
            >
              Facebook
            </label>

            <input
              type="text"
              id="facebook"
              {...register("social.facebook")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              {...register("Password")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          <p className="text-red-700">{errors?.Password?.message}</p>

          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="ConfirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password Confirmation
            </label>

            <input
              type="password"
              id="ConfirmPassword"
              {...register("ConfirmPassword")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          <p className="text-red-700">{errors?.ConfirmPassword?.message}</p>

          </div>


          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="PhoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>

            <input
              type="text"
              id="PhoneNumber"
              {...register("PhoneNumber.0")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
              {errors?.PhoneNumber?.length >0 && <p className="text-red-700">{errors?.PhoneNumber[0]?.message}</p> }

          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="additionalPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Phone Number
            </label>

            <input
              type="text"
              id="additionalphone"
              {...register("PhoneNumber.1")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
                          {/* <p className="text-red-700">{errors?.ConfirmPassword?.message}</p> */}

          </div>

          <div className="col-span-6">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon Code
            </label>
            {fields?.map((field,index)=>(
                <div key={index} className='flex mb-2'>
                  <input
                type="text"
                {...register(`CouponCode.${index}.number`)}
              />
              {
                fields?.length >1 && 
                <button type="button" onClick={()=>remove(index)}> 
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                </button>
               
              }
              {errors?.CouponCode?.length >0 && 
              <p className="text-red-700">
              {errors?.CouponCode[index]?.number?.message}
            </p> 
              }
              {/* */}
                </div>
               ))}
            <button type="button" onClick={()=>append({numbers:""})}> 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </button>
          </div>
          <div className="col-span-6">
            <label htmlFor="Terms" className="flex gap-4">
              <input
                type="checkbox"
                id="Terms"
                {...register("Terms")}
                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />
               <p className="text-red-700">{errors?.Terms?.message}</p>
              <span className="text-sm text-gray-700">
                I want to receive emails about events, product updates and
                company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline">
                terms and conditions
              </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
            type="submit"
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="#" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
      <DevTool control={control}/>
    </main>
  </div>
</section>

  )
}

export default Registration