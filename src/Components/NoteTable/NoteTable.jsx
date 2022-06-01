import React from "react"

const Table = ()=>{
    return(
        <div class="container text-center">
            <table class="table table-dark table-striped table-bordered" id="tdtable">
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Deadline
                    </th>
                    <th>
                        <button type="button" class="btn btn-outline-light btn-sm btn-block">Add new task</button>
                    </th>
                </tr>
            </table>
        </div>
    );
}

export default Table;
                    