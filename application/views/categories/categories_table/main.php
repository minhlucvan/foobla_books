<div class="panel panel-default">
    <div class="panel-heading">
        total <?php echo sizeof($table_rows); ?> records

        <button class="btn btn-sm btn-primary btn-table-head pull-right" data-toggle="modal" data-target="#big-modal" title="new category">
            <i class="fa fa-plus"></i> add category
        </button>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>total book</th>
                    <th class="-align-right" >action</th>
                </tr>
                </thead>
                <tbody>
                <?php if(isset($table_rows)): ?>
                    <?php foreach ($table_rows as $index => $row): ?>
                        <tr class="row_<?php echo $row->id; ?>">
                            <td class="col-md-1">
                                <?php echo $index + 1 ?>
                            </td>
                            <td class="col-md-6"><a href="<?php echo base_url("/index.php/book/category/".$row->id) ?>" data-field="name"> <?php echo $row->name; ?></a></td>
                            <td class="col-md-2" data-field="total"><?php echo $row->total; ?></td>
                            <td class="col-md-3">
                                <div class="btn btn-sm btn-outline btn-primary" title="detail">
                                    <span class="glyphicon glyphicon-eye-open "></span>
                                </div>
                                <div class="btn btn-sm btn-outline btn-success edit-category-modal" data-target=".row_<?php echo $row->id; ?>" title="edit">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </div>
                                <div class="btn btn-sm btn-outline btn-danger delete-modal" data-target=".row_<?php echo $row->id; ?>" title="remove">
                                    <span class="glyphicon glyphicon-remove"></span>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </div>
        <!-- /.table-responsive -->
    </div>
    <!-- /.panel-body -->
</div>
<!-- /.panel -->