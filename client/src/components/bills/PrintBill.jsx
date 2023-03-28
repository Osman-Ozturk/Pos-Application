import React, { useRef } from "react";
import {useReactToPrint} from "react-to-print"
import { Modal,Button } from "antd";
const PrintBill = ({ isModalOpen, setIsModalOpen, customer}) => {
  const date = new Date(customer?.createdAt?.substring(0,10));
  date.setDate(date.getDate() + 10);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title="Print invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
         <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Bill-Details:</p>
                  <p className="text-green-800 ">{customer.customerName}</p>
                  <p> Fake Street 123</p>
                  <p> San Javier </p>
                  <p> CA 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Bill:</p>
                  The Boring Company
                  <p> Tesla Street 007</p>
                  <p> Frisco </p>
                  <p> CA 0000</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Bill Number:</p>
                    <p>{"000"+Math.round(Math.random()*100 + 1)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">
                      Date of Issue:
                    </p>
                    <p>{(customer.createdAt)?.substring(0,10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700 sm:block hidden">Terms:</p>
                    <p>10 Day</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Due:</p>
                    <p>{date.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Bild
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell"
                    >
                      {" "}
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                 {customer?.cartItems?.map(item => (
                   <tr className="border-b border-slate-200">
                   <td className="py-4 ">
                     <img
                       src={item.img}
                       alt=""
                       className="w-12 h-12 object-cover sm:table-cell hidden"
                     />
                   </td>
                   <td className="py-4">
                     <span className="font-medium ">{item.title}</span>
                   </td>
                   <td className="py-4 text-center sm:table-cell hidden">
                     <span>{item.price}</span>
                   </td>
                   <td className="py-4 text-center sm:table-cell hidden">
                     <span>{item.quantity}</span>
                   </td>
                   <td className="py-4 text-end">
                     <span>{item.quantity*item.price}€</span>
                   </td>
                 </tr>
                 ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Subtotal
                      </span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">{customer.subTotal}€</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">+{customer.tax}€</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Total</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">{customer.totalAmount}€</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                  Payment terms are 14 days. Late Unpackaged Debts
                     According to the Pay Act 0000, freelancers are exempt from this period.
                     00:00 late fee in case the debts are not paid after
                     that they have the right to demand and that at this point
                     Please note that a new invoice will be submitted in addition.
                     If the revised invoice is not paid within 14 days, the due date
                     additional interest on the previous account and 8% statutory rate plus 0.5%
                     A total of 8.5% will be applied, including the England base.
                     The parties cannot make a contract other than the provisions of the Law.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>Print</Button>
      </div>
      
    </Modal>
  );
};

export default PrintBill;
