import { apiGet } from "../../api";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const AdminProducts = {
    async render() {
        const data = await apiGet("/books");
        console.log(data);
        return /* html */`
        ${Header.render()}
        <div class="shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-center">
                <thead class="text-xs text-white uppercase bg-blue-500">
                    <tr>
                        <th scope="col" class="px-6 py-3">STT</th>
                        <th scope="col" class="px-6 py-3">Products Name</th>
                        <th scope="col" class="px-6 py-3">Price</th>
                        <th scope="col" class="px-6 py-3">Image</th>
                        <th scope="col" class="px-6 py-3">Author</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">
                        Edit
                        </th>
                        <th scope="col" class="px-6 py-3">
                        Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map((book, index) =>/* html */`
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        ${index + 1}
                        </th>
                        <td class="px-6 py-4">
                        <a href="/admin/products/${book.id}" class="hover:text-blue-800" data-navigo>
                        ${book.name}
                        </a>
                        </td>
                        <td class="px-6 py-4">
                        ${book.list_price}
                        </td>
                        <td class="px-6 py-4 flex">
                            ${book.images.map((items) => `
                            <img src="${items.base_url}" alt="" width=10%>
                            `).join("")}
                        </td>
                        <td class="px-6 py-4">
                        ${book.authors ? book.authors[0].name : ""}
                        </td>
                        <td class="px-6 py-4">
                        ${book.short_description}
                        </td>
                        <td class="px-6 py-4 text-right">
                        <a href="/admin/products/${book.id}/edit" > <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">UPDATE</button></a>
                        </td>
                        <td class="px-6 py-4 text-right">
                        <a href="#" > <button type="button" id="btn" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">DELETE</button></a>
                        </td>
                    </tr>
                    `).join("")};
                </tbody>
            </table>
        </div>
            ${Footer.render()}
        `;
    },
    afterRender(){
        const btns = document.getElementById('#btn');
        console.log('btns', btns);
        for( let btn of btns){
            const id = btn.dataset.id;
            btn.addEventListener('click',async function() {
                const confirm = window.confirm("Bạn có chắc chắn muốn xóa không");
                if(confirm){
                    const data = await remove(id)
                }
            })
        }
    }

};

export default AdminProducts;